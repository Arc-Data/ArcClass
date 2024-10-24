using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Service
{
    public class ClassroomService : IClassroomService
    {   
        private static Random _random = new();
        private readonly ApplicationDBContext _context;
        private readonly IClassroomRepository _classroomRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IStudentClassroomRepository _studentClassroomRepo;

        public ClassroomService(ApplicationDBContext context, IClassroomRepository classroomRepo, UserManager<AppUser> userManager, IStudentClassroomRepository studentClassroomRepo)
        {
            _context = context;
            _classroomRepo = classroomRepo;
            _userManager = userManager;
            _studentClassroomRepo = studentClassroomRepo;
        }

        public string GenerateRandomId(int length = 6)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var id = new char[length];

            for (int i = 0; i < length; i++)
            {
                id[i] = chars[_random.Next(chars.Length)];
            }

            return new string(id);
        }

        public async Task<string> GenerateUniqueRandomId()
        {
            string uniqueId;
            do
            {   
                uniqueId = GenerateRandomId();
            }
            while (await _classroomRepo.ClassroomExists(uniqueId));

            return uniqueId;
        }

        public async Task<bool> IsUserAuthorizedToPost(Classroom classroom, string userId)
        {
            if (userId == classroom.TeacherId) return true;

            var student = await _userManager.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Id == userId);
            if (student == null) return false;

            return await _studentClassroomRepo.StudentExistsInClassroom(student, classroom);
        }
    }
}