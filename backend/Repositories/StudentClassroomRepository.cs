using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Account;
using backend.Dtos.Classroom;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class StudentClassroomRepository : IStudentClassroomRepository
    {
        private readonly ApplicationDBContext _context;

        public StudentClassroomRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<StudentClassroom?> CreateAsync(StudentClassroom studentClassroom)
        {
            _context.StudentClassrooms.Add(studentClassroom);
            await _context.SaveChangesAsync();
            return studentClassroom;
        }

        public async Task<StudentClassroom?> DeleteStudentClassroom(Student student, Classroom classroom)
        {
            var studentClassroom = await _context.StudentClassrooms.FirstOrDefaultAsync(sc => sc.StudentId == student.Id && sc.ClassroomId == classroom.Id);
            if (studentClassroom == null) return null;
            _context.StudentClassrooms.Remove(studentClassroom);
            await _context.SaveChangesAsync();
            return studentClassroom;

        }

        public async Task<IList<Student>> GetClassroomParticipants(string id)
        {
            return await _context.StudentClassrooms
                .Where(sc => sc.ClassroomId == id)
                .Include(sc => sc.Student)
                .Select(sc => sc.Student!)
                .ToListAsync();
        }

        public async Task<IList<StudentClassroom>> GetStudentClassroomsAsync(string studentId)
        {
            return await _context.StudentClassrooms
                .Include(sc => sc.Classroom)
                .ThenInclude(c => c!.Teacher)
                .Where(sc => sc.StudentId == studentId)
                .ToListAsync();
        }

        public async Task<IList<Student>> GetStudentsByClassroomIdAsync(string id)
        {
            return await _context.StudentClassrooms
                .Where(sc => sc.ClassroomId == id)
                .Include(sc => sc.Student)
                .Select(sc => sc.Student!)
                .ToListAsync();
        }

        public async Task<bool> StudentExistsInClassroom(Student student, Classroom classroom)
        {
            return await _context.StudentClassrooms
                .AnyAsync(sc => sc.ClassroomId == classroom.Id && sc.StudentId == student.Id);
        }
    }
}