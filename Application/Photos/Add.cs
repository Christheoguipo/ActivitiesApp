using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<PhotoDto>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<PhotoDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _mapper = mapper;
            }

            public async Task<Result<PhotoDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
                // No need to check if photoUploadResult is null; PhotoAccessor will throw an error if something wrong happened.

                var photoDto = new PhotoDto
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url,
                };

                if (!user.Photos.Any(p => p.IsMain)) photoDto.IsMain = true;

                user.Photos.Add(_mapper.Map<Photo>(photoDto));

                var success = await _context.SaveChangesAsync() > 0;

                if (!success)
                    return Result<PhotoDto>.Failure("Problem adding photo.");

                return Result<PhotoDto>.Success(photoDto);
            }
        }
    }
}
