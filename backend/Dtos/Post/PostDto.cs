using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Models;

namespace backend.Dtos.Post
{
    public class PostDto
    {
        public int Id { get; set; }
        public UserDto? User { get; set; }
        public string ClassroomId { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime DateModified { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}