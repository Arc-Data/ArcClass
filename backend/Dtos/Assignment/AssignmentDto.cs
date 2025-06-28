using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Assignment
{
    public class AssignmentDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime? SubmissionDate { get; set; } 
        public int MaxGrade { get; set; }
        public string SubmissionStatus { get; set; } = string.Empty;
        public bool IsTeacherView { get; set; } = false;
        public int SubmissionCount { get; set; } = 0;
    }
}