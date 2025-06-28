using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Extensions;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/materials")]
    public class MaterialController(MaterialRepository materialRepo, AssignmentSubmissionRepository submissionRepo) : ControllerBase
    {
        private readonly MaterialRepository _materialRepo = materialRepo;
        private readonly AssignmentSubmissionRepository _submissionRepo = submissionRepo;

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userId = User.GetId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated");
            
            var material = await _materialRepo.GetByIdAsync(id);
            if (material == null) return NotFound("Material not found");

            bool hasPermission = false;

            if (material.AssignmentId.HasValue)
            {
                // Check if the user is the owner of the assignment
                var assignment = await _submissionRepo.GetByIdAsync(material.AssignmentId.Value);
                if (assignment != null && assignment.StudentId == userId)
                {
                    hasPermission = true;
                }
            }

            if (!hasPermission)
            {
                return Forbid("You do not have permission to delete this material");
            }
            
            await _materialRepo.DeleteAsync(material);
            return NoContent();
        }
    }
}