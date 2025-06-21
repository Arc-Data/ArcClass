using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


/* NOTE : Review Delete 
// Currently there is a three way delete interaction between Post, AppUser, and Comments where 
// it has been decided that Post should delete Comments but deletion of User should 
// mean that the frontend should be able to handle comments from Deleted Users
// TODO : Handle Comments from deleted Users
*/
namespace backend.Data
{
    public class ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions) : IdentityDbContext<AppUser>(dbContextOptions)
    {
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }  
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<StudentClassroom> StudentClassrooms { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<AssignmentSubmission> AssignmentSubmissions { get; set; }
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
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Assignment>()
                .HasOne(a => a.Classroom)
                .WithMany(c => c.Assignments)
                .HasForeignKey(a => a.ClassroomId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Post>()
                .HasOne(p => p.Classroom)
                .WithMany(c => c.Posts)
                .HasForeignKey(c => c.ClassroomId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Post>()
                .HasOne(p => p.Assignment)
                .WithMany()
                .HasForeignKey(p => p.AssignmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Assignment>()
                .HasMany(a => a.Materials)
                .WithOne(m => m.Assignment)
                .HasForeignKey(m => m.AssignmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Assignment>()
                .HasMany(a => a.Comments)
                .WithOne(c => c.Assignment)
                .HasForeignKey(a => a.AssignmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Classroom>()
                .HasMany(c => c.Materials)
                .WithOne(m => m.Classroom)
                .HasForeignKey(m => m.ClassroomId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Post>()
                .HasMany(p => p.Materials)
                .WithOne(m => m.Post)
                .HasForeignKey(m => m.PostId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithOne(c => c.Post)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Comment>()
                .HasOne(c => c.AppUser)
                .WithMany(a => a.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Classroom>()
                .HasOne(c => c.Teacher)
                .WithMany(t => t.Classrooms)
                .HasForeignKey(c => c.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

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

            builder.Entity<AssignmentSubmission>()
                .HasOne(a => a.Student)
                .WithMany(s => s.AssignmentSubmissions)
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<AssignmentSubmission>()
                .HasOne(a => a.Assignment)
                .WithMany(a => a.AssignmentSubmissions)
                .HasForeignKey(a => a.AssignmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<AssignmentSubmission>()
                .HasMany(a => a.Materials)
                .WithOne(m => m.AssignmentSubmission)
                .HasForeignKey(m => m.AssignmentSubmissionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}