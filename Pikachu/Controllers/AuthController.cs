using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json.Linq;
using Pikachu.Models;

namespace Pikachu.Controllers
{
    [Route("api/auth/{action=login}")]
    public class AuthController : Controller
    {
        private PikachuContext db;

        public AuthController(PikachuContext context)
        {
            db = context;
        }

        [HttpPost]
        [ActionName("login")]
        public async void LoginAction()
        {
            if (!Request.Body.CanRead)
            {
                Response.StatusCode = 400;
                return;
            }
            
            JObject body = await Utils.ParseRequest(Request);
            string userName = body.Property("login").Value.ToString();
            string userPassword = body.Property("password").Value.ToString();
            User user = db.Users.FirstOrDefault(u =>
                        u.Name.Equals(userName) && u.Password.Equals(userPassword));

            if (user != null)
            {
                await Authenticate(userName);
                Response.StatusCode = 200; // ok
            }
            else
                Response.StatusCode = 202; // User name not found
        }

        [HttpPost]
        [ActionName("register")]
        public async void RegisterAction()
        {
            if (!Request.Body.CanRead)
            {
                Response.StatusCode = 400;
                return;
            }
            
            JObject body = await Utils.ParseRequest(Request);
            string userName = body.Property("login").Value.ToString();
            string userEmail = body.Property("email").Value.ToString();
            string userPassword = body.Property("password").Value.ToString();
            User user = db.Users.FirstOrDefault(u =>
                        u.Email == userEmail ||
                        u.Name == userName);

            if (user == null)
            {
                db.Users.Add(new User()
                {
                    Name = userName,
                    Email = userEmail,
                    Password = userPassword
                });
                db.SaveChanges();
                await Authenticate(userName);
                Response.StatusCode = 200; // ok
            }
            else
                Response.StatusCode = 203; // User already exists
        }

        private async Task Authenticate(string userName)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}