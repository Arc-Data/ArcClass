using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public AccountService(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }
        public async Task<(bool Succeeded, string? Token, IEnumerable<IdentityError>? Errors)> CreateStudentAsync(CreateStudentDto studentDto)
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
            if (!result.Succeeded) return (false, null, result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(student, "Student");
            if (!roleResult.Succeeded) return (false, null, roleResult.Errors);

            var token = _tokenService.CreateToken(student);
            return (true, token, null);
        }

        public async Task<(bool Succeeded, string? Token)> LoginStudentAsync(LoginDto loginDto)
        {
            var student = await _userManager.Users.OfType<Student>().FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (student == null) return (false, null);

            var result = await _signInManager.CheckPasswordSignInAsync(student, loginDto.Password, false);

            if (!result.Succeeded) return (false, null);

            var token = _tokenService.CreateToken(student);
            return (true, token);
        }

    }
}