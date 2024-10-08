using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/classroom")]
    public class ClassroomController : ControllerBase
    {
        public ClassroomController()
        {
            
        }

        [HttpPost]
        public async Task<IActionResult> CreateClassroom()
        {
            return Created();
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinClassroom()
        {
            return Ok();
        }
    }
}