using Application.Core;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(p => p.DisplayName).NotEmpty();
            }
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
                var user = await _dbContext.Users
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                user.Bio = request.Bio ?? user.Bio;
                user.DisplayName = request.DisplayName ?? user.DisplayName;

                _dbContext.Entry(user).State = EntityState.Modified;

                var result = await _dbContext.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to update profile.");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
