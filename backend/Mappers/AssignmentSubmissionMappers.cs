using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.AssignmentSubmission;
using backend.Models;

namespace backend.Mappers
{
    public static class AssignmentSubmissionMappers
    {
        public static AssignmentSubmissionDto ToAssignmentSubmissionDto(this AssignmentSubmission assignmentSubmission)
        {
            return new AssignmentSubmissionDto
            {
                Id = assignmentSubmission.Id,
                AssignmentId = assignmentSubmission.AssignmentId,
                Student = assignmentSubmission.Student?.ToStudentDto(),
                Grade = assignmentSubmission.Grade,
                Materials = assignmentSubmission.Materials.Select(m => m.ToMaterialDto()).ToList(),
                Description = assignmentSubmission.Description
            };
        }
    }
}