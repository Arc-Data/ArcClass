using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;

namespace backend.Dtos.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        public UserDto? User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime DateModified { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}