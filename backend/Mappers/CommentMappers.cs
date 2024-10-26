using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Dtos.Comment;
using backend.Models;

namespace backend.Mappers
{
    public static class CommentMappers
    {
        public static CommentDto ToCommentDto(this Comment comment)
        {
            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                DateModified = comment.DateModified,
                CreatedAt = comment.CreatedAt,
                User = new UserDto
                {
                    Id = comment.AppUser!.Id,
                    FullName = $"{comment.AppUser.FirstName} {comment.AppUser.LastName}"
                }
            };
        }
    }
}