using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/student/classrooms")]
    public class StudentClassroomController(
        IStudentClassroomRepository studentClassroomRepo
    ) : ControllerBase
    {
        private readonly IStudentClassroomRepository _studentClassroomRepo = studentClassroomRepo;

        [HttpGet("count")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetStudentAssignmentCounts()
        {
            var userId = User.GetId();
            if (userId == null) return Forbid();

            var count = await _studentClassroomRepo.GetStudentClassroomAssignmentCounts(userId);
            return Ok(count);
        }

        [HttpGet("assignments")]
        [Authorize]
        public async Task<IActionResult> GetAssignments([FromQuery] string? start, [FromQuery] string? end) 
        {
            var userId = User.GetId();
            if (userId == null) return Forbid();

            DateTime? startDate = null;
            DateTime? endDate = null;

            if (!string.IsNullOrEmpty(start) && DateTime.TryParse(start, out var parsedStart))
            {
                startDate = parsedStart;
            }

            if (!string.IsNullOrEmpty(end) && DateTime.TryParse(end, out var parsedEnd))
            {
                endDate = parsedEnd;
            }

            var assignments = await _studentClassroomRepo.GetStudentClassroomAssignments(userId, startDate, endDate);
            var assignmentsDto = assignments.Select(a => a.ToAssignmentDto());
            return Ok(assignmentsDto);
        }
    }
}