using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Dtos.Classroom;
using backend.Models;

namespace backend.Mappers
{
    public static class ClassroomMappers
    {
        public static ClassroomDto ToClassroomDto(this Classroom classroom)
        {
            return new ClassroomDto
            {
                Id = classroom.Id,
                Name = classroom.Name,
                SemesterStart = classroom.SemesterStart,
                SemesterEnd = classroom.SemesterEnd,
                Teacher = new TeacherDto 
                    {
                        Id = classroom.TeacherId!,
                        FullName = $"{classroom.Teacher!.FirstName} {classroom.Teacher!.LastName}"
                    }
            };
        }
    }
}