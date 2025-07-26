using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.AssignmentSubmission;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    /* NOTE: Might need to consider separating teacher and student related submission functionalities
    // into different controllers or methods for better organization and clarity.
    */
    [ApiController]
    [Route("api/assignment/submissions")]
    public class AssignmentSubmissionController(
        IAssignmentSubmissionRepository assignmentSubmissionRepository,
        IMaterialRepository materialRepository,
        IFileStorageService fileStorageService,
        IAssignmentRepository assignmentRepository
    ) : ControllerBase
    {
        private readonly IAssignmentSubmissionRepository _assignmentSubmissionRepo = assignmentSubmissionRepository;
        private readonly IMaterialRepository _materialRepo = materialRepository;
        private readonly IFileStorageService _fileStorageService = fileStorageService;
        private readonly IAssignmentRepository _assignmentRepo = assignmentRepository;

        /*
        // This is specifically for Students to get their own submissions.
        */
        [HttpGet]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetSubmissions()
        {
            var userId = User.GetId();
            var submissions = await _assignmentSubmissionRepo.GetAssignmentSubmissions(userId);
            return Ok(submissions);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetSubmissionById([FromRoute] int id)
        {
            var submission = await _assignmentSubmissionRepo.GetByIdAsync(id);
            if (submission == null)
            {
                return NotFound("Submission not found.");
            }

            if (User.IsInRole("Student") && submission.StudentId != User.GetId())
            {
                return Forbid("You do not have permission to view this submission.");
            }

            return Ok(submission.ToAssignmentSubmissionDto());
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

        [HttpPost("{submissionId}/files")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> AttachFiles([FromRoute] int submissionId, [FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("No files provided");

            var userId = User.GetId();
            var submission = await _assignmentSubmissionRepo.GetByIdAsync(submissionId);
            
            if (submission == null)
                return NotFound("Submission not found");

            if (submission.StudentId != userId)
                return Forbid("You can only add files to your own submissions");

            var assignment = await _assignmentRepo.GetByIdAsync(submission.AssignmentId);
            if (assignment == null)
                return NotFound("Associated assignment not found");

            var uploadedFiles = new List<object>();

            try
            {
                foreach (var file in files)
                {
                    if (file == null || file.Length == 0) continue;

                    var filePath = await _fileStorageService.SaveFileAsync(file, assignment.ClassroomId);
                    
                    var material = new Material
                    {
                        FileName = file.FileName,
                        FilePath = filePath,
                        AssignmentSubmissionId = submissionId,
                        ClassroomId = assignment.ClassroomId
                    };

                    await _materialRepo.CreateAsync(material);
                    
                    uploadedFiles.Add(new { 
                        materialId = material.Id,
                        fileName = material.FileName 
                    });
                }
                
                return Ok(new { 
                    message = $"{uploadedFiles.Count} file(s) uploaded successfully",
                    files = uploadedFiles 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error uploading files: {ex.Message}");
            }
        }
    }
}