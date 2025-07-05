using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.AssignmentSubmission
{
    public class AssignmentSubmissionDto
    {
        public int Id { get; set; }
        public int AssignmentId { get; set; }
        public string StudentId { get; set; } = string.Empty;
        public int Grade { get; set; }
        public List<MaterialDto> Materials { get; set; } = new List<MaterialDto>();
        public string? Description { get; set; } = string.Empty;
    }
}