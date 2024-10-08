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
        public Task<(bool Succeeded, string? Token, string? refreshToken, IEnumerable<IdentityError>? Errors)> CreateUserAsync(CreateUserDto userDto);
        public Task<(bool Succeeded, string? Token, string? refreshToken)> LoginUserAsync(LoginDto loginDto);
        public Task<(bool Succeeded, string? newToken, string? NewRefreshToken)> RefreshTokenAsync(string refreshToken);
        public Task<bool> RevokeTokenAsync(string refreshToken);
    }
}