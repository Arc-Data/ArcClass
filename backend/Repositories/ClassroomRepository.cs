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
            return await _context.Classrooms
                .Include(sc => sc.StudentClassrooms)
                .AnyAsync(c => c.Id == classroomId);
        }

        public async Task<Classroom?> CreateAsync(Classroom classroom)
        {
            _context.Classrooms.Add(classroom);
            await _context.SaveChangesAsync();
            return classroom;
        }

        public async Task<Classroom?> DeleteAsync(string id)
        {
            var classroomModel = await _context.Classrooms.FirstOrDefaultAsync(c => c.Id == id);
            if (classroomModel == null) return null;
            _context.Classrooms.Remove(classroomModel);
            await _context.SaveChangesAsync();
            return classroomModel;
        }

        public async Task<Classroom?> GetByIdAsync(string id)
        {
            return await _context.Classrooms
                .Include(c => c.Teacher)
                .Include(c => c.StudentClassrooms)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<List<Classroom>> GetTeacherClassroomsAsync(string teacherId)
        {
            return await _context.Classrooms
                .Include(c => c.Teacher)
                .Where(c => c.TeacherId == teacherId)
                .ToListAsync();        
            }
    }
}