using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;

namespace backend.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly string _baseUploadPath;

        public FileStorageService(IConfiguration configuration)
        {
            _baseUploadPath = Path.Combine(Directory.GetCurrentDirectory(), configuration["FileStorage:UploadFolder"] ?? "uploads");

            if (string.IsNullOrEmpty(_baseUploadPath))
            {
                throw new ArgumentException("BaseUploadPath configuration is missing or invalid.");
            }
        }
        public void DeleteFileAsync(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                throw new ArgumentException("File path is invalid");
            }

            if (File.Exists(filePath))
            {
                try
                {
                    File.Delete(filePath);
                }
                catch (Exception ex)
                {
                    throw new IOException($"Error deleting file at {filePath}", ex);
                }
            }
            else
            {
                throw new FileNotFoundException("File not found", filePath);
            }
        }

        public async Task<string> SaveFileAsync(IFormFile file, string classroomId)
        {
            if (file == null || file.Length == 0) 
            {
                throw new ArgumentException("File is empty");
            }

            var classroomFolder = Path.Combine(_baseUploadPath, $"Classroom_{classroomId}");
            Directory.CreateDirectory(classroomFolder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(classroomFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return filePath;
        }
    }
}