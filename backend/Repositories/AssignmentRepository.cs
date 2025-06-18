using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    
    public class AssignmentRepository(ApplicationDBContext context, IFileStorageService fileService) : IAssignmentRepository
    {
        private readonly ApplicationDBContext _context = context;
        private readonly IFileStorageService _fileService = fileService;

        public async Task<Assignment?> CreateAsync(Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();
            return assignment;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Assignments
                .AnyAsync(i => i.Id == id);
        }

        public Task<IList<Assignment>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetAssignmentCounts()
        {
            await Task.Delay(3000);
            return 1;
        }

        public async Task<Assignment?> GetAssignmentDetailAsync(int id)
        {
            return await _context.Assignments
                .Include(a => a.Comments)
                .Include(a => a.Classroom)
                    .ThenInclude(c => c!.Teacher)
                .Include(a => a.Materials)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Assignment?> GetByIdAsync(int id)
        {
            return await _context.Assignments
                .Include(a => a.Classroom)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        /* NOTE: Regarding Repository Function Distinctions
        // Would it be better to regard classroom assignments as a method 
        // of the classroom repository or does it work best as a method within
        // the assignment repository
        */
        public async Task<IList<Assignment>> GetClassroomAssignments(string id)
        {
            return await _context.Assignments
                .Where(a => a.ClassroomId == id)
                .ToListAsync();
        }

        public async Task<bool> TryDeleteAsync(int id, string userId)
        {
            var assignment = await _context.Assignments
                .Include(a => a.Classroom)
                .Include(a => a.Comments)
            .Include(a => a.Materials)
                .Where(a => a.Id == id && a.Classroom!.TeacherId == userId)
                .FirstOrDefaultAsync();

            if (assignment == null) return false;

            foreach (var material in assignment.Materials) {
                _fileService.DeleteFileAsync(material.FilePath); 
                _context.Materials.Remove(material);
            }

            if (assignment.Comments.Any()) {
                _context.Comments.RemoveRange(assignment.Comments);
            }

            var post = await _context.Posts.FirstOrDefaultAsync(post => post.AssignmentId == id);

            if (post != null) {
                _context.Posts.Remove(post);
            }

            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Assignment?> UpdateAsync(Assignment assignment)
        {
            _context.Assignments.Update(assignment);
            await _context.SaveChangesAsync();
            return assignment;
        }
    }
}