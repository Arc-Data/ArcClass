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
using backend.Dtos.Account;
using backend.Dtos.Post;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/classroom")]
    public class ClassroomController : ControllerBase
    {
        private readonly IClassroomService _classroomService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IClassroomRepository _classroomRepo;
        private readonly IStudentClassroomRepository _studentClassroomRepo;

        public ClassroomController(IClassroomService classroomService, UserManager<AppUser> userManager, IClassroomRepository classroomRepo, IStudentClassroomRepository studentClassroomRepo)
        {
            _classroomService = classroomService;
            _userManager = userManager;
            _classroomRepo = classroomRepo;
            _studentClassroomRepo = studentClassroomRepo;
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
            else if (roles.Contains("Student"))
            {
                var studentClassrooms = await _studentClassroomRepo.GetStudentClassroomsAsync(user.Id);
                var studentClassroomsDto = studentClassrooms
                    .Where(sc => sc.Classroom != null) // Ensure we only process non-null classrooms
                    .Select(sc => sc.Classroom!.ToClassroomDto())
                    .Distinct()
                    .ToList();

                return Ok(studentClassroomsDto);

            }
            else 
            {
                return Unauthorized("Something is wrong with the role assignment");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> CreateClassroom([FromBody] CreateClassroomDto classroomDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var email = User.GetEmail();
            var teacher = await _userManager.Users.OfType<Teacher>().FirstOrDefaultAsync(t => t.Email == email);

            if (teacher == null) return NotFound("Teacher not found.");

            var uniqueId = await _classroomService.GenerateUniqueRandomId();
            var classroom = new Classroom {
                Id = uniqueId,
                Subject = classroomDto.Subject!,
                Section = classroomDto.Section!,
                TeacherId = teacher.Id,
                SemesterStart = classroomDto.SemesterStart ?? DateTime.UtcNow
            };

            await _classroomRepo.CreateAsync(classroom);

            return Ok(classroom.ToClassroomDto());
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

        [HttpDelete("{id}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            var classroom = await _classroomRepo.DeleteAsync(id);
            if (classroom == null) 
                return NotFound();
                
            return NoContent();
        }

        [HttpPost("{id}")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Exists([FromRoute] string id)
        {
            
            var classroom = await _classroomRepo.GetByIdAsync(id);
            if (classroom == null)
                return NotFound($"Classroom with id '{id}' does not exist");
            
            var email = User.GetEmail();
            var student = await _userManager.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Email == email);
            if (student == null) return Unauthorized("Student not found");

            var isExisting = await _studentClassroomRepo.StudentExistsInClassroom(student, classroom);

            return Ok(new {
                Classroom = classroom.ToClassroomExistsDto(),
                IsExisting = isExisting,
            });
        }      

        /* NOTE : Reconsider process whether to recheck classroom exists
        Redundant because web process involves calling Exists first before JoinClassroom
        */
        [HttpGet("{id}/participants")]
        [Authorize]
        public async Task<IActionResult> GetStudentList([FromRoute] string id) 
        {
            var classroom = await _classroomRepo.GetByIdAsync(id);
            
            if (classroom == null) 
            {
                return NotFound("Classroom Id does not exist");
            }

            var students = await _studentClassroomRepo.GetClassroomParticipants(id);
            var teacherDto = new TeacherDto  {
                Id = classroom.TeacherId!,
                FullName = $"{classroom.Teacher!.FirstName} {classroom.Teacher!.LastName}"
            };

            var participantsDto = new ClassroomParticipantsDto {
                Teacher = teacherDto,
                Students = students.Select(student => student.ToStudentDto()).ToList()
            };

            return Ok(participantsDto);
        }

        [HttpPost("{id}/join")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> JoinClassroom([FromRoute] string id)
        {
            var email = User.GetEmail();

            var student = await _userManager.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Email == email);
            if (student == null) return Unauthorized("Student not found");

            var classroom = await _classroomRepo.GetByIdAsync(id);
            if (classroom == null) return NotFound();

            if (await _studentClassroomRepo.StudentExistsInClassroom(student, classroom))
            {
                return Ok(classroom.Id);
            }

        var studentClassroom = new StudentClassroom {
                Student = student,
                Classroom = classroom,
            };

            await _studentClassroomRepo.CreateAsync(studentClassroom);
            return Ok(studentClassroom.Classroom.ToClassroomDto());
        }

        [HttpPost("{id}/leave")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> LeaveClassroom(string id)
        {
            var email = User.GetEmail();
            var student = await _userManager.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Email == email);
            if (student == null) return Unauthorized("Student not found");

            var classroom = await _classroomRepo.GetByIdAsync(id);
            if (classroom == null) return NotFound();

            var studentClassroom = await _studentClassroomRepo.DeleteStudentClassroom(student, classroom);
            if (studentClassroom == null) return BadRequest();

            return NoContent();
        }

        [HttpPost("{id}/post")]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromRoute] string id, [FromBody] CreatePostDto postDto)
        {
            var classroom = await _classroomRepo.GetByIdAsync(id);
            if (classroom == null) return NotFound("Classroom not found");
            
            var email = User.GetEmail();
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return Unauthorized("Invalid request");

            var post = new Post
            {
                Content = postDto.Content,
                DateModified = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                AppUser = user,
                Classroom = classroom,
            };

            return Ok(post.ToPostDto());
        }
    }
}