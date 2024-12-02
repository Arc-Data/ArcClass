using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Post
    {
        public int Id { get; set; }
        public AppUser? AppUser { get; set; }
        public string? UserId { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime DateModified { get; set; }
        public string Content { get; set; } = string.Empty;
        public Classroom? Classroom { get; set; }
        public Assignment? Assignment { get; set; }
        public string ClassroomId { get; set; } = string.Empty;
        public IList<Material> Materials { get; set; } = [];
        public IList<Comment> Comments { get; set; } = [];
        [NotMapped]
        public int NumberOfComments { get; set; }
    }
}