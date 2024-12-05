using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Dtos.Comment;
using backend.Dtos.Post;
using backend.Models;

namespace backend.Mappers
{
    public static class PostMappers
    {
        public static PostDto ToPostDto(this Post post)
        {
            Console.WriteLine();
            Console.WriteLine("In here somehow");
            Console.WriteLine(post.AssignmentId);
            Console.WriteLine();
            Console.WriteLine();

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
                ClassroomId = post.ClassroomId,
                NumberOfComments = post.NumberOfComments,
                AssignmentId = post.AssignmentId,
                Comments = post.Comments.Select(comment => comment.ToCommentDto()).ToList(),
                Materials = post.Materials.Select(material => material.ToMaterialDto()).ToList()
            };
            
        }
    }
}