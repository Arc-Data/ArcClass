using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/assignments")]
    public class AssignmentController(IAssignmentRepository assignmentRepo) : ControllerBase
    {
        private readonly IAssignmentRepository _assignmentRepo = assignmentRepo;

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
    }
}