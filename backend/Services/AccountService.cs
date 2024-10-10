using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Dtos.Account;
using backend.Enums;
using backend.Interfaces;
using backend.Models;
using backend.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

/* TODO:
    Create a background service that deletes tokens past expiry
*/
namespace backend.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ApplicationDBContext _context;

        public AccountService(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, ApplicationDBContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _context = context;
        }
        public async Task<(bool Succeeded, string? Token, string? refreshToken, IEnumerable<IdentityError>? Errors)> CreateUserAsync(CreateUserDto userDto)
        {
            AppUser user;
            if (userDto.Account == AccountType.Student)
            {
                user = new Student
                {
                    UserName = userDto.Email,
                    Email = userDto.Email,
                    FirstName = userDto.FirstName,
                    MiddleName = userDto.MiddleName,
                    LastName = userDto.LastName,
                };
            }
            else 
            {
                user = new Teacher
                {
                    UserName = userDto.Email,
                    Email = userDto.Email,
                    FirstName = userDto.FirstName,
                    MiddleName = userDto.MiddleName,
                    LastName = userDto.LastName,
                };
            }

            var result = await _userManager.CreateAsync(user, userDto.Password!);
            if (!result.Succeeded) return (false, null, null, result.Errors);

            var roleName = userDto.Account == AccountType.Student ? "Student" : "Teacher";
            var roleResult = await _userManager.AddToRoleAsync(user, roleName);
            if (!roleResult.Succeeded) return (false, null, null, roleResult.Errors);

            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.CreateToken(user, roles);
            var refreshToken = _tokenService.GenerateRefreshToken(user.Id);

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
            return (true, token, refreshToken.Token, null);
        }

        public async Task<(bool Succeeded, string? Token, string? refreshToken)> LoginUserAsync(LoginDto loginDto)
        {
            var user = await _userManager.Users.OfType<AppUser>().FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user == null) return (false, null, null);

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return (false, null, null);

            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.CreateToken(user, roles);
            var refreshToken = _tokenService.GenerateRefreshToken(user.Id);

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return (true, token, refreshToken.Token);
        }

        public async Task<(bool Succeeded, string? newToken, string? NewRefreshToken)> RefreshTokenAsync(string refreshToken)
        {
            var existingToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.Token == refreshToken && !t.IsRevoked);

            if (existingToken == null || existingToken.ExpiryDate <= DateTime.UtcNow)
            {
                return (false, null, null);
            }

            var appUser = await _context.Users.FindAsync(existingToken.UserId);
            if (appUser == null)
            {
                return (false, null, null);
            }
            
            var roles = await _userManager.GetRolesAsync(appUser);

            var newToken = _tokenService.CreateToken(appUser, roles);
            var newRefreshToken = _tokenService.GenerateRefreshToken(existingToken.UserId);
            
            existingToken.IsRevoked = true;

            await _context.RefreshTokens.AddAsync(newRefreshToken);
            await _context.SaveChangesAsync();
            
            return (true, newToken, newRefreshToken.Token);
        }

        public Task<bool> RevokeTokenAsync(string refreshToken)
        {
            throw new NotImplementedException();
        }
    }
}