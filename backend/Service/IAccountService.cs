using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Dtos.Account;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Service
{
    public interface IAccountService
    {
        public Task<(bool Succeeded, string? Token, IEnumerable<IdentityError>? Errors)> CreateStudentAsync(CreateStudentDto studentDto);
        public Task<(bool Succeeded, string? Token)> LoginStudentAsync(LoginDto loginDto);
    }
}