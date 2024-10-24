using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Post
{
    public class CreatePostDto
    {
        [Required]
        public string Content { get; set; } = string.Empty;
    }
}