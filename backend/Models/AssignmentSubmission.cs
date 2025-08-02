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
        public string StudentId { get; set; } = string.Empty;
        public DateTime SubmissionDate { get; set; }
        public string? Description { get; set; }
        public int Grade { get; set; }
        public bool IsGraded { get; set; } = false;
        public DateTime? EvaluatedAt { get; set; }
        // Navigation properties
        public Assignment Assignment { get; set; } = null!;
        public Student Student { get; set; } = null!;
        public ICollection<Material> Materials { get; set; } = new List<Material>();
    }
}