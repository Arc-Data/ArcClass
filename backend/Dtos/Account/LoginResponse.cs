using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Account
{
    public class LoginResponse
    {
        public bool IsLoggedIn { get; set; } = false;
        public string Token { get; set; } = string.Empty;
        public string Refresh { get; set; } = string.Empty;
    }
}