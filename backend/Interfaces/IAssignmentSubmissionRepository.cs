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
        Task<AssignmentSubmission?> GetByIdAsync(int id);
        Task<bool> DeleteAsync(int id, string userId);
        Task<AssignmentSubmission?> GetByAssignmentAndStudentAsync(int assignmentId, string studentId);
        Task<IList<AssignmentSubmission>> GetAssignmentSubmissions(string userId);
    }
}