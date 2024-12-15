using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Dtos.Assignment;
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
                Section = classroom.Section,
                Subject = classroom.Subject,
                SemesterStart = classroom.SemesterStart,
                SemesterEnd = classroom.SemesterEnd,
                Teacher = new TeacherDto 
                    {
                        Id = classroom.TeacherId!,
                        FullName = $"{classroom.Teacher!.FirstName} {classroom.Teacher!.LastName}"
                    }
            };
        }

        public static AssignmentClassroomDto ToAssignmentClassroomDto(this Classroom classroom
        {
            return new AssignmentClassroomDto 
            {
                Id = classroom.Id,
                Subject = classroom.Subject
            };
        }
        public static ClassroomExistsDto ToClassroomExistsDto(this Classroom classroom)
        {
            return new ClassroomExistsDto 
            {
                Id = classroom.Id,
                Section = classroom.Section,
                Subject = classroom.Subject,
                SemesterStart = classroom.SemesterStart,
                SemesterEnd = classroom.SemesterEnd,
                Teacher = new TeacherDto 
                    {
                        Id = classroom.TeacherId!,
                        FullName = $"{classroom.Teacher!.FirstName} {classroom.Teacher!.LastName}"
                    },
                StudentCount = classroom.StudentClassrooms.Count
            };
        }
    }
}