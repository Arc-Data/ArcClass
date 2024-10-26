using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        public CommentController()
        {
            
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteComment()
        {
            return Ok();
        }
    }
}