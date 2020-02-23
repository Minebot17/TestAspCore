using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pikachu.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public int AuthorId { get; set; }
        public int Rating { get; set; }
        public DateTime PublishDate { get; set; }
    }
}