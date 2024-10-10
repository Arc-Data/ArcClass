using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Models;

namespace backend.Dtos.Classroom
{
    public class ClassroomDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateTime SemesterStart { get; set; } 
        public DateTime? SemesterEnd { get; set; }
        public TeacherDto? Teacher { get; set; }
    }
}