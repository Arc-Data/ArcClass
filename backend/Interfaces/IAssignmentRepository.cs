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
        Task<Assignment?> Delete(int id);
        Task<Assignment?> UpdateAsync(Assignment assignment);
        Task<IList<Assignment>> GetAll();
        Task<IList<Assignment>> GetClassroomAssignments(string id); 
    }
}