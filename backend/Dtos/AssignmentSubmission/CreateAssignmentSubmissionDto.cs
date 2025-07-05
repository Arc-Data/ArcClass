using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace backend.Dtos.AssignmentSubmission
{
    public class CreateAssignmentSubmissionDto
    {
        public string? Description { get; set; }
        public IFormFileCollection Files { get; set; } = new FormFileCollection();
    }
}