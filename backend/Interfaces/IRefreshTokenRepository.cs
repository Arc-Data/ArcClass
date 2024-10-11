using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task<List<RefreshToken>> GetTokensByUserIdAsync(string userId);
        Task RevokeTokensAsync(List<RefreshToken> tokens);
    }
}