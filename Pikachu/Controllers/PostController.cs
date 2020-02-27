using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json.Linq;
using Pikachu.Models;

namespace Pikachu.Controllers
{
    [Route("api/post/{action=add}")]
    public class PostController : Controller
    {
        const int MinTitle = 5;
        const int MinText = 20;

        private PikachuContext db;

        public PostController(PikachuContext context)
        {
            db = context;
        }

        [HttpPost]
        [ActionName("add")]
        public async void AddPostAction()
        {
            if (!Request.Body.CanRead)
            {
                Response.StatusCode = 400;
                return;
            }

            if (User.Identity.IsAuthenticated)
            {
                JObject body = await Utils.ParseRequest(Request);
                string title = body.Property("title").Value.ToString();
                string text = body.Property("text").Value.ToString();

                if (title.Length >= MinTitle && text.Length >= MinText)
                {
                    db.Posts.Add(new Post()
                    {
                        Title = title,
                        Message = text,
                        AuthorId = db.Users.FirstOr(u => u.Name == User.Identity.Name, new User()).Id,
                        Rating = 0,
                        PublishDate = DateTime.Now
                    });
                    db.SaveChanges();
                    Response.StatusCode = 200; // ok
                }
                else
                    Response.StatusCode = 202; // title or text lower than minimum
            }
            else
                Response.StatusCode = 201; // user not authorized
        }
    }
}