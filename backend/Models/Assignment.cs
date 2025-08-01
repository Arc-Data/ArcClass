using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Assignment;

namespace backend.Models
{
    [Table("Assignments")]
    public class Assignment
    {
        public int Id { get; set; }
        public Classroom? Classroom { get; set; }
        public string ClassroomId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? SubmissionDate { get; set; }
        public int MaxGrade { get; set; }   
        public IList<Material> Materials { get; set; } = [];
        public IList<Comment> Comments { get; set; } = [];
        public IList<AssignmentSubmission> AssignmentSubmissions { get; set; } = [];
    }
}