using Application.Activities;
using Application.Comments;
using Application.Photos;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(u => u.IsMain).Url));

            CreateMap<PhotoDto, Photo>();

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(u => u.Photos.FirstOrDefault(u => u.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(u => u.Followers.Count))
                .ForMember(d => d.FollowingsCount, o => o.MapFrom(u => u.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(u => u.Followers.Any(f => f.Observer.UserName == currentUsername)));

            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(c => c.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(c => c.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(c => c.Author.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}
