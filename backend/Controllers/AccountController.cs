using System.Threading.Tasks;
using backend.Dtos;
using backend.Dtos.Account;
using backend.Interfaces;
using backend.Models;
using backend.Service;
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
        private readonly IAccountService _accountService;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(IAccountService accountService, UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _accountService = accountService;
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("student")]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentDto studentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succeeded, token, errors) = await _accountService.CreateStudentAsync(studentDto);
        
            if (succeeded) return Ok(new {Token = token});
            
            if (errors != null)
            {
                foreach (var error in errors)
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
            }

            return StatusCode(500);
        }

        [HttpPost("student/login")]
        public async Task<IActionResult> StudentLogin(LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var (succeeded, token) = await _accountService.LoginStudentAsync(loginDto);

            if (succeeded) return Ok(new { Token = token});

            return Unauthorized("Invalid Credentials");
        }
        
    }
}