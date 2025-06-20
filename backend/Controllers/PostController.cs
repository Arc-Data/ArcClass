using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Post;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

/*
// [ ] - Reduce data fetches on delete methods
// Refer to TryDeletePost for validating on fetch
*/
namespace backend.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepo;
        private readonly ICommentRepository _commentRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IClassroomService _classroomService;

        public PostController(IPostRepository postRepo, UserManager<AppUser> userManager, IClassroomService classroomService, ICommentRepository commentRepo)
        {
            _postRepo = postRepo;
            _commentRepo = commentRepo;
            _userManager = userManager;
            _classroomService = classroomService;
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userId = User.GetId();
            var succeeded = await _postRepo.TryDeletePost(id, userId);
            if (!succeeded) return NotFound("Post not found or not authorized to delete");
            
            return NoContent();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreatePostDto postDto) 
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var post = await _postRepo.GetByIdAsync(id);
            if (post == null) return NotFound();

            if (post.UserId != User.GetId()) return Forbid();

            post.Content = postDto.Content;
            post.DateModified = DateTime.UtcNow;

            await _postRepo.UpdateAsync(post);
            return NoContent();
        }

        [HttpGet("{id}/comments")]
        [Authorize]
        public async Task<IActionResult> GetAllComments([FromRoute] int id)
        {
            var exists = await _postRepo.PostExists(id);
            if (!exists) return NotFound();

            var comments = await _commentRepo.GetAllCommentsAsync(id);
            var commentsDto = comments.Select(c => c.ToCommentDto()).ToList();
            return Ok(commentsDto);
        }


        [HttpPost("{id}/comments")]
        [Authorize]
        public async Task<IActionResult> CreateComment([FromRoute] int id, [FromBody] CreatePostDto commentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.GetId();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return Unauthorized();

            var post = await _postRepo.GetByIdAsync(id);
            if (post == null) return NotFound();

            var isAllowedToPost = await _classroomService.IsUserAuthorizedToPost(post.Classroom!, userId);
            if (!isAllowedToPost) return Forbid();

            var comment = new Comment
            {
                Content = commentDto.Content,
                DateModified = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                AppUser = user,
                Post = post,
            };

            await _commentRepo.CreateAsync(comment);
            return Ok(comment.ToCommentDto());
        }
    }
}