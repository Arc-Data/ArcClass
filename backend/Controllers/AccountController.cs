using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("student")]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentDto studentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var student = new Student
            {
                UserName = studentDto.Email,
                Email = studentDto.Email,
                FirstName = studentDto.FirstName,
                MiddleName = studentDto.MiddleName,
                LastName = studentDto.LastName,
                BirthDate = studentDto.BirthDate
            };

            var createdStudent = await _userManager.CreateAsync(student, studentDto.Password);
            if (createdStudent.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(student, "Student");
                if (roleResult.Succeeded)
                {
                    return Ok(new StudentDto
                    {
                        Email = student.Email,
                        FirstName = student.FirstName,
                        MiddleName = student.MiddleName,
                        LastName = student.LastName,
                        Token = _tokenService.CreateToken(student)
                    });
                }
                return StatusCode(500, roleResult.Errors);
            }
            return StatusCode(500, createdStudent.Errors);
        }
    }
}
