using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IAssignmentRepository
    {
        Task<Assignment?> CreateAsync(Assignment assignment); 
        Task<bool> TryDeleteAsync(int id, string userId);
        Task<Assignment?> UpdateAsync(Assignment assignment);
        Task<IList<Assignment>> GetAll();
        Task<Assignment?> GetByIdAsync(int id);
        Task<Assignment?> GetAssignmentDetailAsync(int id);
        Task<IList<Assignment>> GetClassroomAssignments(string id); 
    }
}