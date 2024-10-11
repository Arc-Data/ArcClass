using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class RefreshTokenCleanupService : BackgroundService
    {
        private readonly ApplicationDBContext _context;

        private readonly TimeSpan _cleanupInterval = TimeSpan.FromDays(7);
        public RefreshTokenCleanupService(ApplicationDBContext context)
        {
            _context = context;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(_cleanupInterval, stoppingToken);

                try 
                {
                    var expiredTokens = await _context.RefreshTokens
                        .Where(t => t.ExpiryDate <= DateTime.UtcNow)
                        .ToListAsync(stoppingToken);

                    if (expiredTokens.Count != 0)
                    {
                        _context.RefreshTokens.RemoveRange(expiredTokens);
                        await _context.SaveChangesAsync(stoppingToken);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error occured:");
                    Console.WriteLine(ex);
                }
            }
        }
    }
}