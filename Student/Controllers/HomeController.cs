using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Student.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Student.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            if (Request.Cookies["str1"] != null)

            {
                return RedirectToAction("Dashboard");
            }
            else
            {
                return View();
            }
        }


        public IActionResult Dashboard()
        {
            if (Request.Cookies["str1"] == null)

            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
        public IActionResult UserList()
        {

            if (Request.Cookies["str1"] == null)

            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public IActionResult AddUser()
        {

            if (Request.Cookies["str1"] == null)

            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public IActionResult AddCourse()
        {

            if (Request.Cookies["str1"] == null)

            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public IActionResult CourseList()
        {

            if (Request.Cookies["str1"] == null)

            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public IActionResult Profile()
        {

            if (Request.Cookies["str1"] == null)

            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public IActionResult BindStudent()
        {

            if (Request.Cookies["str1"] == null)

            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public IActionResult BindStudentList()
        {
           

            if (Request.Cookies["str1"] == null)

            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
