using System.Security.Claims;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Dtos.Account;
using backend.Extensions;
using backend.Interfaces;
using backend.Models;
using backend.Service;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IRefreshTokenRepository _refreshTokenRepo;

        public AccountController(IAccountService accountService, IRefreshTokenRepository refreshTokenRepo)
        {
            _accountService = accountService;
            _refreshTokenRepo = refreshTokenRepo;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succeeded, token, refreshToken, errors) = await _accountService.CreateUserAsync(userDto);
        
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
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto requestDto)
        {
            if (string.IsNullOrWhiteSpace(requestDto.Refresh))  return BadRequest("Refresh token is required");

            var (succeeded, newToken, newRefreshToken) = await _accountService.RefreshTokenAsync(requestDto.Refresh);

            if(!succeeded) return Unauthorized();

            return Ok(new {
                Access = newToken,
                Refresh = newRefreshToken
            });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized("user ID not found in claims");
            }

            var tokensToRevoke = await _refreshTokenRepo.GetTokensByUserIdAsync(userId);

            if (tokensToRevoke.Count == 0)
            {
                return BadRequest("No tokens found for the user");
            }

            await _refreshTokenRepo.RevokeTokensAsync(tokensToRevoke);

            return Ok("Logged out successfully");
        }
        
    }
}
