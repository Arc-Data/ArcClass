using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IMaterialRepository
    {
        Task<Material> CreateAsync(Material material);
        Task<IList<Material>> GetByClassroomIdAsync(string id);
        Task<Material?> GetByIdAsync(int id);
        Task<IList<Material>> GetByPostIdAsync(int id);
        Task<IList<Material>> GetByAssignmentIdAsync(int assignmentId);
        Task<bool> DeleteAsync(Material material);
    }
}