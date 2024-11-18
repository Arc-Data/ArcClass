using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using backend.Data;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

/* NOTE : Regarding Redundant Fetches. Some with more data than others
// For example, the GetById function returns a classroom object that includes
// the teacher associated with it alongside the number of studentclassrooms associated with it,
// which is pretty important in order to load the number of participants correctly
// 
//      see CreateAssignment - 
//      this code is the lead up to ensuring the teacher who owns the classroom
//      is the one responsible for creating the assignment 
// 
//      var classroom = await _classroomRepo.GetByIdAsync(id);
//      if (classroom == null) return NotFound();
        
//      if (classroom.TeacherId != User.GetId()) return Unauthorized();
// 
// this code however does not need the implementation of including studentclassrooms
// revisit the code whether it is advisable to create multiple functions of GetByIdAsync  
// with the Includes part slightly differing from each other 
// (one with teacher only - one with studentclassrooms included)
*/

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

        public async Task<IList<Post>> GetPostsAsync(string classroomId)
        {
            return await _context.Posts
                .Include(p => p.AppUser)
                .Where(p => p.ClassroomId == classroomId)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new Post
                {
                    Id = p.Id,
                    CreatedAt = p.CreatedAt,
                    AppUser = p.AppUser,
                    ClassroomId = p.ClassroomId,
                    Content = p.Content,
                    Comments = p.Comments
                        .OrderByDescending(c => c.CreatedAt)
                        .Take(2)
                        .ToList(),
                    NumberOfComments = p.Comments.Count(),
                    Materials = p.Materials
                })
                .ToListAsync();
        }

        public async Task<List<Classroom>> GetTeacherClassroomsAsync(string teacherId)
        {
            return await _context.Classrooms
                .Where(c => c.TeacherId == teacherId)
                .ToListAsync();        
            }
    }
}