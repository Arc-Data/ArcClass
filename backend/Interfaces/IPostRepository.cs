using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IPostRepository
    {
        Task<Post?> CreateAsync(Post post);
        Task<Post?> DeleteAsync(int id);
        Task<Post?> GetByIdAsync(int id);
        Task<Post?> GetByAssignmentId(int id);
        Task<Post?> UpdateAsync(Post post);
        Task<bool> PostExists(int id);
        Task<bool> TryDeletePost(int id, string userId);
    }
}