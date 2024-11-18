using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Material
    {
        public int Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public string ClassroomId { get; set; } = string.Empty;
        public Classroom? Classroom { get; set; } 
        public int? PostId { get; set; }
        public Post? Post { get; set; }
    }
}