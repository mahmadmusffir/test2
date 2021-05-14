using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Student.Models;
using Student_.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Student.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseApiController : ControllerBase
    {
        [HttpPost]
        [Route("InsertCourses")]
        public async Task<ActionResult> InsertCourses(Courses std)
        {
            await Task.Delay(0);
            Response res = new Response();
              var  Insertedbyid = EncryptionDecryption.Decrypt(std.Insertedbyid);
            

            if (SQLDatabase.ExecNonQuery("insert into courses (Coursetitle,Description,Fee,Status,InsertedDateTime,Insertedbyid) values ('" + std.Coursetitle + "','" + std.Description + "','" + std.Fee + "',1,'" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "','" + Insertedbyid + "')") > 0)
            {
                res.Status = "Inserted Successfully";
            }
            else
            {
                res.Status = "Insertion failed";
            }


            return Ok(res);


        }

        [HttpPost]
        [Route("GetAllCourses")]
        public async Task<ActionResult> GetAllCourses(Students std)
        {
            await Task.Delay(0);
            string Uid = EncryptionDecryption.Decrypt(std.str1);
            DataTable table = SQLDatabase.GetDataTable("select Courseid, Coursetitle, Description, Fee from courses where Status='1' ");
            return Ok(table);
        }

        [HttpPost]
        [Route("BindStudent")]
        public async Task<ActionResult> BindStudent(BindStudent std)
        {
            await Task.Delay(0);
            Response res = new Response();

            DataTable table = SQLDatabase.GetDataTable("select * from bindstudent where StudentId="+ std.StudentId + " and CourseId="+ std.CourseId + " and Status=1");

            if (table.Rows.Count > 0)
            {
                res.Status = "Student already exist";
            }
            else
            {
                if (SQLDatabase.ExecNonQuery("insert into bindstudent (StudentId,CourseId,Status) values ('" + std.StudentId + "','" + std.CourseId + "',1)") > 0)
                {
                    res.Status = "Data Saved";
                }
                else
                {
                    res.Status = "Insertion failed";
                }
            }

            return Ok(res);


        }

        [HttpPost]
        [Route("GetBindStudent")]
        public async Task<IActionResult> GetBindStudent(Students std)
        {
            await Task.Delay(0);
            string Uid = EncryptionDecryption.Decrypt(std.str1);
            DataTable table = SQLDatabase.GetDataTable("SELECT (bindstudent.Id) AS bsid,(users.Name) AS StudentName, (courses.Coursetitle) AS CourseTitle, (bindstudent.InsertedDateTime) AS bsdatetime FROM users INNER JOIN bindstudent on bindstudent.StudentId=users.Id and bindstudent.Status=1 INNER JOIN courses ON bindstudent.CourseId=courses.Courseid");
            return Ok(table);
        }

        [HttpPost]
        [Route("DeleteBindStudent")]
        public async Task<ActionResult> DeleteBindStudent(Courses std)
        {
            await Task.Delay(0);
            Response res = new Response();
            res.id = std.BindId;
            if (SQLDatabase.ExecNonQuery("update bindstudent set Status=0 where Id=" + std.BindId) > 0)
            {
                res.Status = "Delete Successfully";
            }
            else
            {
                res.Status = "Deletion Failed";
            }

            return Ok(res);
        }

        [HttpPost]
        [Route("DeleteCourse")]
        public async Task<ActionResult> DeleteCourse(Courses std)
        {
            await Task.Delay(0);
            Response res = new Response();
            res.id = std.Courseid;
            if (SQLDatabase.ExecNonQuery("update courses set Status=0 where Courseid=" + std.Courseid) > 0)
            {
                res.Status = "Delete Successfully";
            }
            else
            {
                res.Status = "Deletion Failed";
            }

            return Ok(res);
        }

        [HttpPost]
        [Route("GetCourseStudent")]
        public async Task<ActionResult> GetCourseStudent(Courses std)
        {
            await Task.Delay(0);
            DataTable table = SQLDatabase.GetDataTable("select users.Name, users.FatherName, users.Email, users.PhoneNumber,bindstudent.Id AS BindId from users INNER JOIN bindstudent ON bindstudent.CourseId= " + std.Courseid+ " AND users.Id= bindstudent.StudentId AND bindstudent.Status=1");
            return Ok(table);
        }

        [HttpPost]
        [Route("UpdateCourse")]
        public async Task<ActionResult> UpdateCourse(Courses std)
        {
            await Task.Delay(0);
            Response res = new Response();
            if (SQLDatabase.ExecNonQuery("UPDATE courses SET Coursetitle='"+std.Coursetitle+"',Description='"+std.Description+"',Fee='"+std.Fee+"'  WHERE Courseid="+std.Courseid) > 0)
            {
                res.Status = "Updated Successfully";
            }
            else
            {
                res.Status = "Updation Failed";
            }

            return Ok(res);
        }
    }
}

