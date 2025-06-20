using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IAssignmentSubmissionRepository
    {
        Task<AssignmentSubmission?> CreateAsync(AssignmentSubmission assignmentSubmission);
        Task<AssignmentSubmission?> UpdateAsync(AssignmentSubmission assignmentSubmission);
        Task<bool> DeleteAsync(int id, string userId);
    }
}