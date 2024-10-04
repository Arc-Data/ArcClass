using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
        RefreshToken GenerateRefreshToken(string userId);
        bool ValidateRefreshToken(string token, string userId);
        void RevokeRefreshToken(string token);
    }
}