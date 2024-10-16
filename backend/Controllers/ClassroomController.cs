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
using backend.Dtos.Classroom;

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

        /* NOTE : Regarding Roles Based Approach (ramble)
        Right now there are only teachers and students involved but it will
        soon scale into Teachers, Students and then quite possibly Admins.
        Strategy might be good to implement later if the possibility of a fourth
        Entity (might not happen right now. But should rethink the entire scheme around version 2)

        The current things that needed to be noted are the possibilities of 
        having more than one role potentially rising to some issues. 
        Roles.Contains() returns a list of strings regarding the roles and it 
        enables the possibility of there being a user with more than one role.
        Even if account creation only assigns either teacher or student.

        Strategy Pattern might be good in the case that there would be more than 
        two user types in the future. While I would argue that three would still be
        in the realm of manageable, I still prefer not introducing if-else if-elses in 
        comparison to an Object with an abstracted method for handling multiple user types.
        Revisit this idea in the future.
        */

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var email = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(email);
            
            if (user == null) return NotFound();

            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains("Teacher"))
            {
                var classrooms = await _classroomRepo.GetTeacherClassroomsAsync(user.Id);
                var classroomsDto = classrooms.Select(c => c.ToClassroomDto()).ToList();
                return Ok(classroomsDto);
            } 
            else 
            {
                return Ok(new {
                    Message = "Student"
                });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> CreateClassroom([FromBody] CreateClassroomDto classroomDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var email = User.GetEmail();
            var teacher = await _userManager.Users.OfType<Teacher>().FirstOrDefaultAsync(t => t.Email == email);

            if (teacher == null)
            {
                return NotFound("Teacher not found.");
            }

            var uniqueId = await _classroomService.GenerateUniqueRandomId();
            var classroom = new Classroom {
                Id = uniqueId,
                Subject = classroomDto.Subject!,
                Section = classroomDto.Section!,
                TeacherId = teacher.Id,
                SemesterStart = classroomDto.SemesterStart ?? DateTime.UtcNow
            };

            await _classroomRepo.CreateAsync(classroom);

            return Ok(classroom.Id);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            var classroom = await _classroomRepo.GetByIdAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }
            return Ok(classroom.ToClassroomDto());
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinClassroom()
        {
            return Ok();
        }
    }
}