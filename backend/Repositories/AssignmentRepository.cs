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
    
    public class AssignmentRepository(ApplicationDBContext context) : IAssignmentRepository
    {
        private readonly ApplicationDBContext _context = context;

        public async Task<Assignment?> CreateAsync(Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();
            return assignment;
        }

        public Task<IList<Assignment>> GetAll()
        {
            throw new NotImplementedException();
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
                .Where(a => a.Id == id && a.Classroom!.TeacherId == userId)
                .FirstOrDefaultAsync();
            if (assignment == null) return false;

            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Assignment?> UpdateAsync(Assignment assignment)
        {
            throw new NotImplementedException();
        }
    }
}