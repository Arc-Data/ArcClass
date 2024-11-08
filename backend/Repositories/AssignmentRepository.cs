using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;

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

        public async Task<Assignment?> UpdateAsync(Assignment assignment)
        {
            throw new NotImplementedException();
        }
    }
}