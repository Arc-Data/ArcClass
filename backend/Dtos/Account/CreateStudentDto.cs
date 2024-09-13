using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
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
        [Required]
        [DataType(DataType.Date)]
        [CustomBirthDateValidation]
        public DateTime BirthDate { get; set; }     

    }

    public class CustomBirthDateValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is DateTime birthDate && birthDate > DateTime.Now)
            {
                return new ValidationResult("Birthdate cannot be in the future.");
            }
            return ValidationResult.Success;
        }
    }
}