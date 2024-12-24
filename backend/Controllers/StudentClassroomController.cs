using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Extensions;
using backend.Interfaces;
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
    }
}