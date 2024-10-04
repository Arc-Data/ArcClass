using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class RefreshToken
    {
        public int Id { get; set; } 
        public string Token { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsRevoked { get; set; }
        public string UserId { get; set; }
    }
}