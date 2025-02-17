using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Profile Profile { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dbContext;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dbContext, IUserAccessor userAccessor)
            {
                _dbContext = dbContext;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var profile = await _dbContext.Users
                    .SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (profile == null)
                {
                    return Result<Unit>.Failure("User not found.");
                }

                if (request.Profile.DisplayName == null)
                {
                    return Result<Unit>.Failure("Display name should not be blank.");
                }

                profile.DisplayName = request.Profile.DisplayName;
                profile.Bio = request.Profile.Bio;

                _dbContext.Entry(profile).Property(p => p.DisplayName).IsModified = true;

                var result = await _dbContext.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to update profile.");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
