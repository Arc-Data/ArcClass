using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


// NOTE : Review Delete Interactions

namespace backend.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }  
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<StudentClassroom> StudentClassrooms { get; set; }
        public DbSet<Post> Posts { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new() {
                    Id = "12debc9a-4863-41f3-9603-67418de3a39c",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new() {
                    Id = "088a386a-f72f-407c-94d8-72ea97a7a5d3",
                    Name = "Student",
                    NormalizedName = "STUDENT"
                },
                new() {
                    Id = "6c73604f-9771-44b0-ac2e-4f7701cbbf54",
                    Name = "Teacher",
                    NormalizedName = "TEACHER"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);

            builder.Entity<RefreshToken>()
                .HasOne(r => r.AppUser)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Post>()
                .HasOne(p => p.AppUser)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Post>()
                .HasOne(p => p.Classroom)
                .WithMany(c => c.Posts)
                .HasForeignKey(c => c.ClassroomId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Classroom>()
                .HasOne(c => c.Teacher)
                .WithMany(t => t.Classrooms)
                .HasForeignKey(c => c.TeacherId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<StudentClassroom>()
                .HasKey(sc => new { sc.ClassroomId, sc.StudentId });

            builder.Entity<StudentClassroom>()
                .HasOne(sc => sc.Student)
                .WithMany(s => s.StudentClassrooms)
                .HasForeignKey(sc => sc.StudentId);

            builder.Entity<StudentClassroom>()
                .HasOne(sc => sc.Classroom)
                .WithMany(c => c.StudentClassrooms)
                .HasForeignKey(sc => sc.ClassroomId);
        }
    }
}