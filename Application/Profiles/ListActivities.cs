using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _dataContext.ActivityAttendees
                    .Include(aa => aa.Activity.Attendees)
                    .ThenInclude(att => att.AppUser)
                    .Where(aa => aa.AppUser.UserName == request.Username)
                    .OrderBy(aa => aa.Activity.Date)
                    .Select(aa => aa.Activity)
                    .AsQueryable();

                if (request.Predicate == "past")
                {
                    query = query.Where(a => a.Date < DateTime.Now);
                }
                else if (request.Predicate == "future")
                {
                    query = query.Where(a => a.Date >= DateTime.Now);
                }
                else if (request.Predicate == "hosting")
                {
                    query = query.Where(a => a.Attendees.FirstOrDefault(aa => aa.IsHost).AppUser.UserName == request.Username);
                }

                var activities = await query.ToListAsync();

                var userActivityDtoList = new List<UserActivityDto>();

                activities.ForEach(a =>
                {
                    userActivityDtoList.Add(new UserActivityDto
                    {
                        Id = a.Id,
                        Title = a.Title,
                        Category = a.Category,
                        Date = a.Date,
                        HostUsername = a.Attendees.FirstOrDefault(aa => aa.IsHost).AppUser.UserName
                    });
                }
                );

                return Result<List<UserActivityDto>>.Success(userActivityDtoList);
            }
        }
    }
}