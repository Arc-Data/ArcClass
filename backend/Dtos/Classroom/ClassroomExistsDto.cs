using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;

namespace backend.Dtos.Classroom
{
    public class ClassroomExistsDto
    {
        public string Id { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public DateTime? SemesterStart { get; set; } 
        public DateTime? SemesterEnd { get; set; }
        public TeacherDto? Teacher { get; set; }
        public int StudentCount { get; set; }
    }
}