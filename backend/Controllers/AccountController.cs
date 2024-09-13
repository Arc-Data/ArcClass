using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Account;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public AccountController(UserManager<AppUser> userManager)  
        {
            _userManager = userManager;
        }

        [HttpPost("student")]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentDto studentDto)
        {
            try 
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var student = new Student
                {
                    UserName = studentDto.Email,
                    Email = studentDto.Email,
                    FirstName = studentDto.FirstName,
                    MiddleName = studentDto.MiddleName,
                    LastName = studentDto.LastName,
                    BirthDate = studentDto.BirthDate
                };

                var createdStudent = await _userManager.CreateAsync(student, studentDto.Password);
            
                if (createdStudent.Succeeded)
                {   
                    var roleResult = await _userManager.AddToRoleAsync(student, "Student");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            "New User Created"
                        );
                    }
                    else 
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdStudent.Errors);
                }
            }
            catch (Exception e) 
            {
                return StatusCode(500, e);
            }
        }
    }
}