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

namespace backend.Controllers
{
    [ApiController]
    [Route("api/classroom")]
    public class ClassroomController : ControllerBase
    {
        private readonly IClassroomService _classroomService;
        private readonly UserManager<AppUser> _userManager;

        public ClassroomController(IClassroomService classroomService, ApplicationDBContext context, UserManager<AppUser> userManager)
        {
            _classroomService = classroomService;
            _userManager = userManager;
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
            return Ok(new {
                Id = uniqueId
            });
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinClassroom()
        {
            return Ok();
        }
    }
}