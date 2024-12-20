using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Post;
using backend.Models;

namespace backend.Interfaces
{
    public interface IClassroomRepository
    {
        Task<bool> ClassroomExists(string classroomId);
        Task<Classroom?> CreateAsync(Classroom classroom);
        Task<Classroom?> GetByIdAsync(string id);
        Task<List<Classroom>> GetTeacherClassroomsAsync(string teacherId);
        Task<Classroom?> DeleteAsync(string id);
        Task<IList<PostDto>> GetPostsAsync(string classroomId);
    }
}