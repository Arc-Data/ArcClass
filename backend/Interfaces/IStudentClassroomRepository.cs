using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Classroom;
using backend.Models;

namespace backend.Interfaces
{
    public interface IStudentClassroomRepository
    {
        Task<StudentClassroom?> CreateAsync(StudentClassroom studentClassroom);
        Task<StudentClassroom?> DeleteStudentClassroom(Student student, Classroom classroom);
        Task<IList<StudentClassroom>> GetStudentClassroomsAsync(string studentId);
        Task<bool> StudentExistsInClassroom(Student student, Classroom classroom);
        Task<IList<Student>> GetClassroomParticipants(string id);
        Task<int> GetStudentClassroomAssignmentCounts(string id);
    }
}