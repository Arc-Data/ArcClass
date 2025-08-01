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
    public class AssignmentSubmissionRepository(ApplicationDBContext context) : IAssignmentSubmissionRepository
    {
        private readonly ApplicationDBContext _context = context;

        public async Task<bool> AssignmentSubmissionExists(int assignmentId, string user)
        {
            return await _context.AssignmentSubmissions
                .AnyAsync(s => s.AssignmentId == assignmentId && s.StudentId == user);
        }

        public async Task<AssignmentSubmission?> CreateAsync(AssignmentSubmission assignmentSubmission)
        {
            await _context.AssignmentSubmissions.AddAsync(assignmentSubmission);
            await _context.SaveChangesAsync();
            return assignmentSubmission;
        }

        public async Task<bool> DeleteAsync(int id, string userId)
        {
            // i can just include the materials in the submission
            var submission = await _context.AssignmentSubmissions
                .Include(s => s.Materials)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (submission == null || submission.StudentId != userId) return false;

            foreach (var material in submission.Materials)
            {
                _context.Materials.Remove(material);
            }
            _context.AssignmentSubmissions.Remove(submission);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IList<AssignmentSubmission>> GetAssignmentSubmissions(string userId)
        {
            return await _context.AssignmentSubmissions
                .Where(s => s.StudentId == userId)
                .ToListAsync();
        }

        public async Task<AssignmentSubmission?> GetByAssignmentAndStudentAsync(int assignmentId, string studentId)
        {
            return await _context.AssignmentSubmissions
                .Include(s => s.Materials) 
                .Include(s => s.Student)
                .FirstOrDefaultAsync(s => s.AssignmentId == assignmentId && s.StudentId == studentId);
        }

        public async Task<IList<AssignmentSubmission>> GetByAssignmentIdAsync(int id)
        {
            return await _context.AssignmentSubmissions
                .Where(s => s.AssignmentId == id)
                .Include(s => s.Materials)
                .Include(s => s.Student)
                .ToListAsync();
        }

        public async Task<AssignmentSubmission?> GetByIdAsync(int id)
        {
            return await _context.AssignmentSubmissions
                .Include(s => s.Materials)
                .Include(s => s.Student)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public Task<AssignmentSubmission?> GetByStudentIdAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetSubmissionCount(int id)
        {
            return await _context.AssignmentSubmissions
                .CountAsync(s => s.AssignmentId == id);
        }

        public async Task<AssignmentSubmission?> UpdateAsync(AssignmentSubmission assignmentSubmission)
        {
            _context.AssignmentSubmissions.Update(assignmentSubmission);
            await _context.SaveChangesAsync();
            return assignmentSubmission;
        }
    }
}