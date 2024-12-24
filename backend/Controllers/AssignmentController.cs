using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        IStudentClassroomRepository studentClassroomRepo
        ) : ControllerBase
    {
        private readonly IAssignmentRepository _assignmentRepo = assignmentRepo;
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly ICommentRepository _commentRepo = commentRepo;
        private readonly IStudentClassroomRepository _studentClassroomRepo = studentClassroomRepo;

        [HttpDelete("{id}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> Delete([FromRoute] int id) 
        {   
            var userId = User.GetId();
            var succeeded = await _assignmentRepo.TryDeleteAsync(id, userId);
            if (!succeeded) return NotFound("Post not found or you do not have permission to delete");
            
            return NoContent();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var assignment = await _assignmentRepo.GetAssignmentDetailAsync(id);  
            if (assignment == null) return NotFound();

            return Ok(assignment.ToAssignmentDetailDto());
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
    }
}