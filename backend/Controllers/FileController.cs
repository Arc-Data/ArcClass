using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

/* TODO : Handle a wide range of file types
// Consider restricting other types of file extensions
*/
namespace backend.Controllers
{
    [ApiController]
    [Route("api/file")]
    public class FileController : ControllerBase
    {
        private readonly IFileStorageService _fileStorageService;
        private readonly IMaterialRepository _materialRepo;

        public FileController(IFileStorageService fileStorageService, IMaterialRepository materialRepo)
        {
            _fileStorageService = fileStorageService;
            _materialRepo = materialRepo;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile([FromRoute] int id)
        {
            var material = await _materialRepo.GetByIdAsync(id);
            if (material == null) return NotFound("Material not found");
            
            var filePath = material.FilePath;
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found on the server");
            }

            byte[] fileBytes;
            try 
            {
                fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error reading the file: {ex.Message}");
            }

            var fileExtension = System.IO.Path.GetExtension(filePath);
            var mimeType = "application/octet-stream";

            if (fileExtension == ".jpg" || fileExtension == ".jpeg")
            {
                mimeType = "image/jpeg";
            } 
            else if (fileExtension == ".png")
            {
                mimeType = "image/png";
            }
            else if (fileExtension == ".pdf")
            {
                mimeType = "application/pdf";
            }

            return File(fileBytes, mimeType);
        }
    }
}