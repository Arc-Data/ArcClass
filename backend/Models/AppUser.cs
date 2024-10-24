using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public abstract class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = String.Empty;
        public string MiddleName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty; 
        public List<RefreshToken> RefreshTokens { get; set; } = [];
        public List<Post> Posts { get; set; } = [];
    }
}