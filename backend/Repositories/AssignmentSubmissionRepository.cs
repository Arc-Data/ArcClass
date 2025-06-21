using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public class AssignmentSubmissionRepository : IAssignmentSubmissionRepository
    {
        public Task<AssignmentSubmission?> CreateAsync(AssignmentSubmission assignmentSubmission)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id, string userId)
        {
            throw new NotImplementedException();
        }

        public Task<AssignmentSubmission?> UpdateAsync(AssignmentSubmission assignmentSubmission)
        {
            throw new NotImplementedException();
        }
    }
}