using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Classroom;
using backend.Dtos.Comment;

namespace backend.Dtos.Assignment
{
    public class AssignmentDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? SubmissionDate { get; set; }
        public int MaxGrade { get; set; }
        public IList<CommentDto> Comments { get; set; } = [];
        public IList<MaterialDto> Files { get; set; } = [];
        public AssignmentClassroomDto? Classroom { get; set; }
        public bool IsTeacherView { get; set; } = false;
        public int SubmissionCount { get; set; } = 0;
        public string SubmissionStatus { get; set; } = "Not Submitted";
    }
}