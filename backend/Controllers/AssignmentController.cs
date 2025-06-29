using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Assignment;
using backend.Dtos.AssignmentSubmission;
using backend.Dtos.Post;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/assignments")]
    public class AssignmentController(
        IAssignmentRepository assignmentRepo,
        ICommentRepository commentRepo,
        UserManager<AppUser> userManager,
        IPostRepository postRepo,
        IMaterialRepository materialRepo,
        IFileStorageService fileStorageService,
        IAssignmentSubmissionRepository assignmentSubmissionRepo
        ) : ControllerBase
    {
        private readonly IAssignmentRepository _assignmentRepo = assignmentRepo;
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly ICommentRepository _commentRepo = commentRepo;
        private readonly IPostRepository _postRepo = postRepo;
        private readonly IMaterialRepository _materialRepo = materialRepo;
        private readonly IFileStorageService _fileStorageService = fileStorageService;
        private readonly IAssignmentSubmissionRepository _assignmentSubmissionRepo = assignmentSubmissionRepo;

        [HttpDelete("{id}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> Delete([FromRoute] int id) 
        {   
            var userId = User.GetId();
            var succeeded = await _assignmentRepo.TryDeleteAsync(id, userId);
            if (!succeeded) return NotFound("Post not found or you do not have permission to delete");
            
            return NoContent();
        }

        // FIXME: Get assignments should be limited to teachers and students from a specific class
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var user = User.GetId();

            var assignment = await _assignmentRepo.GetAssignmentDetailAsync(id);  
            if (assignment == null) return NotFound();

            // if teacher view, then the 
            bool isTeacherView = assignment.Classroom?.TeacherId == user;
            int submissionCount = await _assignmentSubmissionRepo.GetSubmissionCount(id);
            string submissionStatus = "N/A";

            if (!isTeacherView)
            {
                bool userSubmitted = await _assignmentSubmissionRepo.AssignmentSubmissionExists(id, user);
                Console.WriteLine("Somehow you got here", userSubmitted);
                submissionStatus = userSubmitted ? "Submitted" : "Not Submitted";
            }
            
            return Ok(assignment.ToAssignmentDetailDto(isTeacherView, submissionStatus, submissionCount));
        }
        
        [HttpPut("{id}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreateAssignmentDto assignmentDto) {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.GetId();

            var assignment = await _assignmentRepo.GetByIdAsync(id);
            if (assignment == null) return NotFound();

            if (userId != assignment.Classroom!.TeacherId) return Forbid();

            assignment.Description = assignmentDto.Description;
            assignment.SubmissionDate = assignmentDto.SubmissionDate;
            assignment.Title = assignmentDto.Title;
            assignment.MaxGrade = assignmentDto.MaxGrade;

            var post = await _postRepo.GetByAssignmentId(id);
            if (post == null) return StatusCode(500, "How the hell did you even trigger this edge case");
            post.DateModified = DateTime.UtcNow;

            await _assignmentRepo.UpdateAsync(assignment);
            return NoContent();
        }

        [HttpPost("{id}/comments")]
        [Authorize]
        public async Task<IActionResult> CreateComment([FromRoute] int id, [FromBody] CreatePostDto commentDto) 
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.GetId();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var assignmentExists = await _assignmentRepo.ExistsAsync(id);
            if (!assignmentExists) return NotFound();

            var now = DateTime.UtcNow;

            var comment = new Comment 
            {
                Content = commentDto.Content,
                DateModified = now,
                CreatedAt = now,
                AppUser = user,
                AssignmentId = id,
            };

            await _commentRepo.CreateAsync(comment);
            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{id}/files")]
        [Authorize]
        public async Task<IActionResult> AttachMaterial([FromRoute] int id, [FromForm] IFormFile file) 
        {
            if (file == null || file.Length == 0) 
                return BadRequest("No file uploaded.");

            // the post related to the assignment should have dateModified be updated when a file is added
            var assignment = await _assignmentRepo.GetByIdAsync(id);
            if (assignment == null)
                return NotFound("Assignment not found");

            // Save file to storage
            var filePath = await _fileStorageService.SaveFileAsync(file, assignment.ClassroomId);

            // Create material record
            var material = new Material {
                FileName = file.FileName,
                FilePath = filePath,
                AssignmentId = id,
                ClassroomId = assignment.ClassroomId
            };
            await _materialRepo.CreateAsync(material);

            var post = await _postRepo.GetByAssignmentId(id);
            if (post != null) {
                post.DateModified = DateTime.UtcNow;
                await _postRepo.UpdateAsync(post);
            }

            return Ok("File attached successfully");
        }

        [HttpGet("{id}/files")]
        [Authorize]
        public async Task<IActionResult> GetMaterials([FromRoute] int id) 
        {
            var assignment = await _assignmentRepo.GetByIdAsync(id);
            if (assignment == null)
                return NotFound("Assignment not found");

            var materials = await _materialRepo.GetByAssignmentIdAsync(id);
            return Ok(materials);
        }

        [HttpDelete("{assignmentId}/files/{materialId}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> DeleteMaterial([FromRoute] int assignmentId, [FromRoute] int materialId) 
        {
            var assignment = await _assignmentRepo.GetByIdAsync(assignmentId);
            if (assignment == null)
                return NotFound("Assignment not found");

            var user = User.GetId();
            if (user != assignment.Classroom!.TeacherId)
                return Forbid("You do not have permission to delete this material");

            var material = await _materialRepo.GetByIdAsync(materialId);
            if (material == null || material.AssignmentId != assignmentId)
                return NotFound("Material not found");

            await _materialRepo.DeleteAsync(material);
            return NoContent();
        }

        [HttpPost("{id}/submit")]
        [Authorize]
        public async Task<IActionResult> SubmitAssignment([FromRoute] int id, [FromForm] CreateAssignmentSubmissionDto submissionDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.GetId();
            var existingSubmission = await _assignmentSubmissionRepo.GetByAssignmentAndStudentAsync(id, userId);
            if (existingSubmission != null)
            {
                return BadRequest("You have already submitted this assignment.");
            }

            var assignment = await _assignmentRepo.GetByIdAsync(id);
            if (assignment == null) return NotFound();

            var assignmentSubmission = new AssignmentSubmission
            {
                AssignmentId = id,
                StudentId = userId,
                SubmissionDate = DateTime.UtcNow,
                Description = submissionDto.Description,
                SubmissionUrl = submissionDto.SubmissionUrl
            };

            var savedSubmission = await _assignmentSubmissionRepo.CreateAsync(assignmentSubmission);
            if (savedSubmission == null) return StatusCode(500, "Failed to create submission");

            foreach (var file in submissionDto.Files)
            {
                if (file == null || file.Length == 0) continue;

                var filePath = await _fileStorageService.SaveFileAsync(file, assignment.ClassroomId);
                var material = new Material
                {
                    FileName = file.FileName,
                    FilePath = filePath,
                    AssignmentSubmissionId = savedSubmission.Id, 
                    ClassroomId = assignment.ClassroomId
                };
                await _materialRepo.CreateAsync(material);
            }

            return Ok(savedSubmission.ToAssignmentSubmissionDto());
        }

    }
}