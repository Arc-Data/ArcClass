using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;

namespace backend.Dtos.AssignmentSubmission
{
    public class StudentSubmissionStatusDto
    {
        public StudentDto Student { get; set; } = new StudentDto();
        public AssignmentSubmissionDto? Submission { get; set; }
    }
}
