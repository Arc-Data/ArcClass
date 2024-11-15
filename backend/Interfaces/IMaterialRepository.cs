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
        Task<Material> Delete(int id);
        Task<IList<Material>> GetByClassroomIdAsync(string id);
    }
}