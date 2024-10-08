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
        public string Name { get; set; } = string.Empty;
        public DateTime SemesterStart { get; set; }
        public DateTime? SemesterEnd { get; set; }
        public virtual Teacher? Teacher { get; set; }
        public string? TeacherId { get; set; } = string.Empty;
    }
}