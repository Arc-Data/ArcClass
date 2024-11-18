using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class MaterialDto
    {
        public int Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string GetDownloadUrl()
        {
            return $"/api/files/{Id}";
        }        
    }
}