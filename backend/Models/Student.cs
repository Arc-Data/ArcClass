using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    [Table("Students")]
    public class Student : AppUser
    {
        public IList<StudentClassroom> StudentClassrooms { get; set; } = [];
        public IList<AssignmentSubmission> AssignmentSubmissions { get; set; } = [];
    }
}