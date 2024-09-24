using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Account
{
    public class StudentDto
    {
        public string Email { get; set; } = String.Empty;
        public string FirstName { get; set; } = String.Empty;
        public string MiddleName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Token { get; set; } = String.Empty;
    }
}