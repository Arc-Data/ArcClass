using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IClassroomRepository
    {
        Task<bool> ClassroomExists(string classroomId);
        Task<Classroom?> CreateAsync(Classroom classroom);
        Task<Classroom?> GetByIdAsync(string id);
    }
}