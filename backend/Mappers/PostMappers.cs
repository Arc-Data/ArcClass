using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Dtos.Post;
using backend.Models;

namespace backend.Mappers
{
    public static class PostMappers
    {
        public static PostDto ToPostDto(this Post post)
        {
            return new PostDto 
            {
                Id = post.Id,
                Content = post.Content,
                DateModified = post.DateModified,
                CreatedAt = post.CreatedAt,
                User = new UserDto 
                    {
                        Id = post.AppUser!.Id,
                        FullName =  $"{post.AppUser.FirstName} {post.AppUser.LastName}"
                    },
                ClassroomId = post.ClassroomId
            };
        }
    }
}