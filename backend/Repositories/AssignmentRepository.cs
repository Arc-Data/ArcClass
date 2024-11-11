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
    public class AssignmentRepository : IAssignmentRepository
    {
        private readonly ApplicationDBContext _context;

        public AssignmentRepository(ApplicationDBContext context) 
        {
            _context = context;            
        }

        public async Task<Assignment?> CreateAsync(Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();
            return assignment;
        }

        public async Task<Assignment?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IList<Assignment>> GetAll()
        {
            throw new NotImplementedException();
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

        public async Task<Assignment?> UpdateAsync(Assignment assignment)
        {
            throw new NotImplementedException();
        }
    }
}