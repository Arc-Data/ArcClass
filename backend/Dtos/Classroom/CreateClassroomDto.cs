using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Classroom
{
    public class CreateClassroomDto
    {
        [Required]
        [StringLength(200)]
        public string? Subject { get; set; }
        [Required]
        [StringLength(100)]
        public string? Section { get; set; }
        public DateTime? SemesterStart { get; set; }
        public DateTime? SemesterEnd { get; set; }
    }
}