using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Pikachu.Models;

namespace Pikachu.Controllers
{
    [Route("api/user/{action=lk}")]
    public class UserController : Controller
    {
        private PikachuContext db;

        public UserController(PikachuContext context)
        {
            db = context;
        }

        [HttpGet]
        public void lk()
        {
            if (User.Identity.IsAuthenticated)
            {
                User user = db.Users.FirstOrDefault(u => u.Name == User.Identity.Name);
                if (user != null)
                {
                    JObject userInfo = new JObject(
                        new JProperty("login", user.Name),
                        new JProperty("email", user.Email),
                        new JProperty("rating", 0)
                    );
                    Response.WriteAsync(userInfo.ToString());
                }
                else
                    Response.StatusCode = 202; // user not found in db
            }
            else
                Response.StatusCode = 201; // user not authorized
        }

        [HttpGet]
        public async void logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                Response.StatusCode = 200;
            }
            else
                Response.StatusCode = 206;
        }
    }
}