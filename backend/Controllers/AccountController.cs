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

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto studentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succeeded, token, refreshToken, errors) = await _accountService.CreateUserAsync(studentDto);
        
            if (succeeded) return Ok(new {
                Access = token,
                Refresh = refreshToken
            });
            
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

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> StudentLogin(LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var (succeeded, token, refreshToken) = await _accountService.LoginUserAsync(loginDto);

            if (succeeded) return Ok(new { 
                Access = token,
                Refresh = refreshToken
            });

            return Unauthorized("Invalid Credentials");
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))  return BadRequest("Refresh token is required");

            var (succeeded, newToken, newRefreshToken) = await _accountService.RefreshTokenAsync(refreshToken);

            if(!succeeded) return Unauthorized();

            return Ok(new {
                Access = newToken,
                Refresh = newRefreshToken
            });
        }
        
    }
}
