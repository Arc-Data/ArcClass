using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;
using Microsoft.EntityFrameworkCore.Storage;

namespace backend.Dtos.Account
{
    public class CreateStudentDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; } = String.Empty;
        [Required]
        public string? Password { get; set; } = String.Empty;
        [Required]
        public string FirstName { get; set; } = String.Empty;
        [Required]
        public string MiddleName { get; set; } = String.Empty;
        [Required]
        public string LastName { get; set; } = String.Empty;  
        public AccountType Account { get; set; } 
    }

}