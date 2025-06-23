using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.AssignmentSubmission
{
    public class CreateAssignmentSubmissionDto
    {
        public List<IFormFile> Files { get; set; } = [];
        public string? Description { get; set; } = string.Empty;
        public string? SubmissionUrl { get; set; } = string.Empty;
    }
}