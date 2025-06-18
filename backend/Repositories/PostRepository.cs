using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class PostRepository(ApplicationDBContext context, IFileStorageService fileService) : IPostRepository
    {
        private readonly ApplicationDBContext _context = context;
        private readonly IFileStorageService _fileService = fileService;

        public async Task<Post?> CreateAsync(Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        /* NOTE: Eligible for Deletion
        // uhhh.. pun intended?
        // temporarily resorted to delete methods that
        // involve fetching and validating at the same time (see TryDeletePost)
        */
        public async Task<Post?> DeleteAsync(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return null;
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<Post?> GetByAssignmentId(int id)
        {
            return await _context.Posts
                .FirstOrDefaultAsync(p => p.AssignmentId == id);
        }

        public async Task<Post?> GetByIdAsync(int id)
        {
            return await _context.Posts
                .Include(p => p.Classroom)
                .Include(p => p.Materials)
                .Include(p => p.Assignment)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> PostExists(int id)
        {
            return await _context.Posts
                .AnyAsync(p => p.Id == id);
        }

        public async Task<bool> TryDeletePost(int id, string userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try 
            {
                var post = await _context.Posts
                .Include(p => p.Classroom)
                .Where(p => p.Id == id && (
                    p.Classroom!.TeacherId == userId || p.UserId == userId)
                )
                .FirstOrDefaultAsync();

                if (post == null) return false;

                var materials = await _context.Materials
                    .Where(m => m.PostId == id)
                    .ToListAsync();

                foreach (var material in materials)
                {
                    _fileService.DeleteFile(material.FilePath);
                    _context.Materials.Remove(material);
                }

                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return true;
            }
            catch 
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task<Post?> UpdateAsync(Post post)
        {
             _context.Posts.Update(post);
             await _context.SaveChangesAsync();
             return post;
        }
    }
}