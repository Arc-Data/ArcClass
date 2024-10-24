using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Service
{
    public interface IClassroomService
    {
        Task<string> GenerateUniqueRandomId();
        string GenerateRandomId(int length = 6);
        Task<bool> IsUserAuthorizedToPost(Classroom classroom, string userId);
    }
}