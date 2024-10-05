using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Dtos.Account;
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
            var student = new Student
            {
                UserName = studentDto.Email,
                Email = studentDto.Email,
                FirstName = studentDto.FirstName,
                MiddleName = studentDto.MiddleName,
                LastName = studentDto.LastName,
            };

            var result = await _userManager.CreateAsync(student, studentDto.Password!);
            if (!result.Succeeded) return (false, null, null, result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(student, "Student");
            if (!roleResult.Succeeded) return (false, null, null, roleResult.Errors);

            var token = _tokenService.CreateToken(student);
            var refreshToken = _tokenService.GenerateRefreshToken(student.Id);

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

            var token = _tokenService.CreateToken(student);
            return (true, token, null);
        }

        public Task<(bool Succeeded, string? newToken, string? NewREfreshToken)> RefreshTokenAsync(string refreshToken)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RevokeTokenAsync(string refreshToken)
        {
            throw new NotImplementedException();
        }
    }
}