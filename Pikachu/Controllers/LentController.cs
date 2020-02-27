using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Pikachu.Models;

namespace Pikachu.Controllers
{
    [Route("api/lent/{action=last}")]
    public class LentController : Controller
    {
        private PikachuContext db;

        public LentController(PikachuContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [ActionName("last")]
        public IActionResult LastPostsAction()
        {
            return GetPostsSortedBy(PostSortAttribute.Date);
        }
        
        [HttpGet]
        [ActionName("best")]
        public IActionResult BestPostsAction()
        {
            return GetPostsSortedBy(PostSortAttribute.Rating);
        }
        
        [HttpGet]
        [ActionName("hot")]
        public IActionResult HotPostsAction()
        {
            return GetPostsSortedBy(PostSortAttribute.Hot);
        }
        
        /// <summary>
        /// Returns a list of posts in the specified sort sequence
        /// </summary>
        /// <param name="attribute">Post sort type</param>
        private IActionResult GetPostsSortedBy(PostSortAttribute attribute)
        {
            IOrderedQueryable<Post> ordered =
            attribute == PostSortAttribute.Date ? db.Posts.OrderByDescending(p => p.PublishDate) :
            attribute == PostSortAttribute.Rating ? db.Posts.OrderByDescending(p => p.Rating) :
            attribute == PostSortAttribute.Hot ? db.Posts.OrderBy(p => p.PublishDate) : // TODO: hot sort
            db.Posts.OrderBy(p => p.PublishDate);

            JArray posts = new JArray(ordered.Select(p => new JObject(
                new JProperty("idpost", p.Id),
                new JProperty("title", p.Title),
                new JProperty("rating", p.Rating),
                new JProperty("text", p.Message),
                new JProperty("date", p.PublishDate.ToString()))));
            
            return Content(posts.ToString());
        }
        
        private enum PostSortAttribute
        {
            Date, Rating, Hot
        }
    }
}