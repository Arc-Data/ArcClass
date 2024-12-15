using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Assignment;
using backend.Models;

namespace backend.Mappers
{
    public static class AssignmentMappers
    {
        public static AssignmentDto ToAssignmentDto(this Assignment assignment)
        {
            return new AssignmentDto 
            {
                Id = assignment.Id,
                Title = assignment.Title,
                SubmissionDate = assignment.SubmissionDate,
                MaxGrade = assignment.MaxGrade,
            };
        }

        public static AssignmentDetailDto ToAssignmentDetailDto(this Assignment assignment)
        {
            Console.WriteLine("In here");
            Console.WriteLine("");
            Console.WriteLine("");
            Console.WriteLine(assignment.Classroom);
            Console.WriteLine("");
            Console.WriteLine("");

            return new AssignmentDetailDto
            {
                Id = assignment.Id,
                Title = assignment.Title,
                Description = assignment.Description,
                SubmissionDate = assignment.SubmissionDate,
                MaxGrade = assignment.MaxGrade, 
                Comments = assignment.Comments.Select(comment => comment.ToCommentDto()).ToList(),
                Files = assignment.Materials.Select(material => material.ToMaterialDto()).ToList(),
                Classroom = assignment.Classroom!.ToAssignmentClassroomDto()
            };
        }
    }
}