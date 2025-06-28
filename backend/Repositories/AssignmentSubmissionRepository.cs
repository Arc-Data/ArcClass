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
                .FirstOrDefaultAsync(s => s.AssignmentId == assignmentId && s.StudentId == studentId);
        }

        public async Task<AssignmentSubmission?> GetByIdAsync(int id)
        {
            return await _context.AssignmentSubmissions.FindAsync(id);
        }

        public Task<AssignmentSubmission?> GetByStudentIdAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<AssignmentSubmission?> UpdateAsync(AssignmentSubmission assignmentSubmission)
        {
            _context.AssignmentSubmissions.Update(assignmentSubmission);
            await _context.SaveChangesAsync();
            return assignmentSubmission;
        }
    }
}