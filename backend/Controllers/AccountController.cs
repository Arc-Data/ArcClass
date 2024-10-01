using System.Threading.Tasks;
using backend.Dtos;
using backend.Dtos.Account;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
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

            foreach (var error in createdStudent.Errors)
            {
                if (error.Code == "DuplicateEmail" || error.Code == "DuplicateUserName")
                {
                    ModelState.AddModelError("Email", "This email is already taken.");
                }
                else if (error.Code.StartsWith("Password"))
                {
                    ModelState.AddModelError("Password", error.Description);
                }
                else
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

            }

            return BadRequest(ModelState);
        }

        [HttpPost("student/login")]
        public async Task<IActionResult> StudentLogin(LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var student = await _userManager.Users.OfType<Student>().FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (student == null) return Unauthorized("Invalid Credentials");
            
            var result = await _signInManager.CheckPasswordSignInAsync(student, loginDto.Password, false);
            
            if (!result.Succeeded) return  Unauthorized("Invalid Credentials");

            return Ok(new StudentDto 
            {
                Email = student.Email,
                FirstName = student.FirstName,
                MiddleName = student.MiddleName,
                LastName = student.LastName,
                Token = _tokenService.CreateToken(student)
            });
        }
        
    }
}
