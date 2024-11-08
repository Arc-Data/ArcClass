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
    }
}