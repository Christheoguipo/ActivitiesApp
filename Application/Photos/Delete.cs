﻿using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if (photo == null) return null;

                if (photo.IsMain)
                    return Result<Unit>.Failure("You cannot delete your main photo.");

                var photoDeleteResult = await _photoAccessor.DeletePhoto(photo.Id);

                if (photoDeleteResult == null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary.");

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (!success)
                    return Result<Unit>.Failure("Problem deleting photo from API.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
