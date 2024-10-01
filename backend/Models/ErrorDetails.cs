using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public Dictionary<string, List<string>> Errors { get; set; } = [];

        public override string ToString() 
        {
            return JsonSerializer.Serialize(this);
        }

        public void AddError(string field, string errorMessage)
        {
            if (Errors.ContainsKey(field))
            {
                Errors[field].Add(errorMessage);
            }
            else
            {
                Errors[field] = new List<string> { errorMessage };
            }
        }

    }
}