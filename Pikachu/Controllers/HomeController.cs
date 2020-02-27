using System;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Hosting;

namespace Pikachu.Controllers
{
    public class HomeController : Controller
    {
        private IWebHostEnvironment env;

        public HomeController(IWebHostEnvironment env)
        {
            this.env = env;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}