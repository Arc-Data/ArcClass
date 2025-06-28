using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.AssignmentSubmission;
using backend.Extensions;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/assignment/submissions")]
    public class AssignmentSubmissionController(IAssignmentSubmissionRepository assignmentSubmissionRepository) : ControllerBase
    {
        private readonly IAssignmentSubmissionRepository _assignmentSubmissionRepo = assignmentSubmissionRepository;

        [HttpGet]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetSubmissions()
        {
            var userId = User.GetId();
            var submissions = await _assignmentSubmissionRepo.GetAssignmentSubmissions(userId);
            return Ok(submissions);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> UpdateSubmission([FromRoute] int id, [FromBody] CreateAssignmentSubmissionDto submissionDto)
        {
            var userId = User.GetId();
            var submission = await _assignmentSubmissionRepo.GetByIdAsync(id);
            if (submission == null || submission.StudentId != userId)
            {
                return NotFound("Submission not found or you do not have permission to update it.");
            }

            submission.Description = submissionDto.Description;
            submission.SubmissionUrl = submissionDto.SubmissionUrl;

            await _assignmentSubmissionRepo.UpdateAsync(submission);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> DeleteSubmission([FromRoute] int id)
        {
            var userId = User.GetId();
            var succeeded = await _assignmentSubmissionRepo.DeleteAsync(id, userId);
            if (!succeeded)
            {
                return NotFound("Submission not found or you do not have permission to delete it.");
            }

            return NoContent();
        }
    }
}