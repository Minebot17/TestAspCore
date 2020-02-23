using System;
using System.Linq;
using Pikachu.Models;

namespace Pikachu
{
    public static class ContextInitializer
    {
        public static void Initialize(PikachuContext context)
        {
            if (!context.Posts.Any())
            {
                context.Posts.AddRange(
                    new Post() { Title = "Post0", Message = "Text of\nthe post0", PublishDate = DateTime.Now },
                    new Post() { Title = "Post1", Message = "Text of\nthe post1", PublishDate = DateTime.Now },
                    new Post() { Title = "Post2", Message = "Text of\nthe post2", PublishDate = DateTime.Now },
                    new Post() { Title = "Post3", Message = "Text of\nthe post3", PublishDate = DateTime.Now }
                );
                context.SaveChanges();
            }
        }
    }
}