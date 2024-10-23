using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;

namespace backend.Dtos.Classroom
{
    public class ClassroomParticipantsDto
    {
        public TeacherDto? Teacher { get; set; }
        public IList<StudentDto> Students { get; set; } = [];
    }
}