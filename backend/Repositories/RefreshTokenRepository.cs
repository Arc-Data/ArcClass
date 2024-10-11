using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly ApplicationDBContext _context;

        public RefreshTokenRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<RefreshToken>> GetTokensByUserIdAsync(string userId)
        {
            return await _context.RefreshTokens 
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task RevokeTokensAsync(List<RefreshToken> tokens)
        {
            _context.RefreshTokens.RemoveRange(tokens);
            await _context.SaveChangesAsync();
        }
    }
}