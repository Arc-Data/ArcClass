using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// NOTE: Could add comments list later  if needed for feedback on submissions
namespace backend.Models
{
    public class AssignmentSubmission
    {
        public int Id { get; set; }
        public int AssignmentId { get; set; }
        public Assignment? Assignment { get; set; }
        public string StudentId { get; set; } = string.Empty;
        public Student? Student { get; set; }
        public int Grade { get; set; }
        public IList<Material> Materials { get; set; } = [];
        public DateTime SubmissionDate { get; set; }
        public string? SubmissionUrl { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
    }
}