using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Classroom
    {
        [Key]
        [StringLength(6, MinimumLength = 6)]
        public string Id { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public DateTime SemesterStart { get; set; }
        public DateTime? SemesterEnd { get; set; }
        public Teacher? Teacher { get; set; }
        public string? TeacherId { get; set; } = string.Empty;
        public IList<StudentClassroom> StudentClassrooms { get; set; } = [];
        public IList<Post> Posts { get; set; } = [];
        public IList<Assignment> Assignments { get; set; } = [];
        public IList<Material> Materials { get; set; } = [];
    }
}