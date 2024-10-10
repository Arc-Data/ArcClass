using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Xml;
using backend.Service;
using backend.Data;
using System.Security.Claims;
using backend.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using backend.Interfaces;
using backend.Mappers;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/classroom")]
    public class ClassroomController : ControllerBase
    {
        private readonly IClassroomService _classroomService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IClassroomRepository _classroomRepo;

        public ClassroomController(IClassroomService classroomService, UserManager<AppUser> userManager, IClassroomRepository classroomRepo)
        {
            _classroomService = classroomService;
            _userManager = userManager;
            _classroomRepo = classroomRepo;
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> CreateClassroom()
        {
            var email = User.GetEmail();
            var teacher = await _userManager.Users.OfType<Teacher>().FirstOrDefaultAsync(t => t.Email == email);

            if (teacher == null)
            {
                return NotFound("Teacher not found.");
            }

            var uniqueId = await _classroomService.GenerateUniqueRandomId();
            var classroom = new Classroom {
                Id = uniqueId,
                Name = "Test Classroom",
                TeacherId = teacher.Id,
                SemesterStart = DateTime.UtcNow
            };

            await _classroomRepo.CreateAsync(classroom);

            return Ok(classroom.ToClassroomDto());
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinClassroom()
        {
            return Ok();
        }
    }
}