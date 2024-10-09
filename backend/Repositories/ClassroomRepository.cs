using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ClassroomRepository : IClassroomRepository
    {
        private readonly ApplicationDBContext _context;

        public ClassroomRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<bool> ClassroomExists(string classroomId)
        {
            return await _context.Classrooms.AnyAsync(c => c.Id == classroomId);
        }

        public async Task<Classroom?> CreateAsync(Classroom classroom)
        {
            _context.Classrooms.Add(classroom);
            await _context.SaveChangesAsync();
            return classroom;
        }
    }
}