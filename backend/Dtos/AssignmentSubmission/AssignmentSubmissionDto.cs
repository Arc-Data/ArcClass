using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Models;

namespace backend.Dtos.AssignmentSubmission
{
    public class AssignmentSubmissionDto
    {
        public int Id { get; set; }
        public int AssignmentId { get; set; }
        public StudentDto Student { get; set; } = new StudentDto();
        public int Grade { get; set; }
        public DateTime SubmissionDate { get; set; }
        public List<MaterialDto> Materials { get; set; } = new List<MaterialDto>();
        public string? Description { get; set; } = string.Empty;
    }
}