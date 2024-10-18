using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    [Table("StudentClassrooms")]
    public class StudentClassroom
    {
        public string StudentId { get; set; } = string.Empty;
        public Student? Student { get; set; } 

        public string ClassroomId { get; set; } = string.Empty;
        public Classroom? Classroom { get; set; }
    }
}