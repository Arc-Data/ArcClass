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
        public async Task<(bool Succeeded, string? Token, string? refreshToken, IEnumerable<IdentityError>? Errors)> CreateStudentAsync(CreateStudentDto studentDto)
        {
            AppUser user;
            if (studentDto.Account == AccountType.Student)
            {
                user = new Student
                {
                    UserName = studentDto.Email,
                    Email = studentDto.Email,
                    FirstName = studentDto.FirstName,
                    MiddleName = studentDto.MiddleName,
                    LastName = studentDto.LastName,
                };
            }
            else 
            {
                user = new Teacher
                {
                    UserName = studentDto.Email,
                    Email = studentDto.Email,
                    FirstName = studentDto.FirstName,
                    MiddleName = studentDto.MiddleName,
                    LastName = studentDto.LastName,
                };
            }

            var result = await _userManager.CreateAsync(user, studentDto.Password!);
            if (!result.Succeeded) return (false, null, null, result.Errors);

            var roleName = studentDto.Account == AccountType.Student ? "Student" : "Teacher";
            var roleResult = await _userManager.AddToRoleAsync(user, roleName);
            if (!roleResult.Succeeded) return (false, null, null, roleResult.Errors);

            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.CreateToken(user, roles);
            var refreshToken = _tokenService.GenerateRefreshToken(user.Id);

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
            return (true, token, refreshToken.Token, null);
        }

        public async Task<(bool Succeeded, string? Token, string? refreshToken)> LoginStudentAsync(LoginDto loginDto)
        {
            var student = await _userManager.Users.OfType<Student>().FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (student == null) return (false, null, null);

            var result = await _signInManager.CheckPasswordSignInAsync(student, loginDto.Password, false);

            if (!result.Succeeded) return (false, null, null);

            var roles = await _userManager.GetRolesAsync(student);
            
            var token = _tokenService.CreateToken(student, roles);
            var refreshToken = _tokenService.GenerateRefreshToken(student.Id);

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return (true, token, refreshToken.Token);
        }

        public async Task<(bool Succeeded, string? newToken, string? NewRefreshToken)> RefreshTokenAsync(string refreshToken)
        {
            var existingToken = await _context.RefreshTokens
                .Include(t => t.AppUser)
                .FirstOrDefaultAsync(t => t.Token == refreshToken && !t.IsRevoked);

            if (existingToken == null || existingToken.ExpiryDate <= DateTime.UtcNow || existingToken.AppUser == null)
            {
                return (false, null, null);
            }
            
            var roles = await _userManager.GetRolesAsync(existingToken.AppUser);

            var newToken = _tokenService.CreateToken(existingToken.AppUser, roles);
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