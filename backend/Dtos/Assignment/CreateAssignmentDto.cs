using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Assignment
{
    public class CreateAssignmentDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? SubmissionDate { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Max Grade must be greater than zero.")]
        public int MaxGrade { get; set; }
    }
}