using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.AssignmentSubmission
{
    public class GradeSubmissionDto
    {
        public int Grade { get; set; }
        public string? Feedback { get; set; } = string.Empty;
    }
}