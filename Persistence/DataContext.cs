using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            builder.Entity<ActivityAttendee>()
                .HasOne(aa => aa.AppUser)
                .WithMany(aa => aa.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
                .HasOne(aa => aa.Activity)
                .WithMany(aa => aa.Attendees)
                .HasForeignKey(aa => aa.ActivityId);

            builder.Entity<Photo>()
                .HasOne(p => p.AppUser)
                .WithMany(u => u.Photos)
                .HasForeignKey(p => p.AppUserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Comment>()
                .HasOne(c => c.Activity)
                .WithMany(a => a.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(u =>
            {
                u.HasKey(k => new { k.ObserverId, k.TargetId});

                u.HasOne(uf => uf.Observer)
                .WithMany(a => a.Followings)
                .OnDelete(DeleteBehavior.Cascade);

                u.HasOne(uf => uf.Target)
                .WithMany(a => a.Followers)
                .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
