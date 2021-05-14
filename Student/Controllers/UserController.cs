using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Student.Models;
using Response = Student.Models.Response;
using Student_.Models;
using Student;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Student.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        public readonly IWebHostEnvironment _environment;
        public UserController(
            IWebHostEnvironment environment)
        {

            _environment = environment;
        }



        [HttpPost]
        [Route("InsertData")]
        public async Task<ActionResult> InsertData(Students std)
        {
            await Task.Delay(0);
            Response res = new Response();

            DataTable table = SQLDatabase.GetDataTable("select* from users where Email='" + std.Email + "'");

            if (table.Rows.Count > 0)
            {
                res.Status = "Email Matched";
            }
            else
            {
                DataTable table1 = SQLDatabase.GetDataTable("select* from users where Username='" + std.Username + "'");

                if (table1.Rows.Count > 0)
                {
                    res.Status = "Username Matched";
                }
                else
                {

                    var UserImage = "/assets/img/faces/card-profile1-square.jpg";

                    var Insertedbyid = std.Insertedbyid;

                    if (Insertedbyid == "" || Insertedbyid == null)
                    {
                        Insertedbyid = std.Insertedbyid;
                    }
                    else
                    {
                        Insertedbyid = EncryptionDecryption.Decrypt(std.Insertedbyid);
                    }

                    if (SQLDatabase.ExecNonQuery("insert into users (Name,FatherName,PhoneNumber,Email,Gender,Address,Username,Password,Image,Status,InsertedDateTime,Insertedbyid) values ('" + std.Name + "','" + std.FatherName + "','" + std.PhoneNumber + "','" + std.Email + "','" + std.Gender + "','" + std.Address + "','" + std.Username + "','" + EncryptionDecryption.Encrypt(std.Password) + "','"+ UserImage + "',1,'" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "','" + Insertedbyid + "')") > 0)
                    {
                        res.Status = "Inserted Successfully";
                    }
                    else
                    {
                        res.Status = "Insertion failed";
                    }
                }
            }
            return Ok(res);
        }


        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login(Students std)
        {
            await Task.Delay(0);
            Response res = new Response();
            DataTable table = SQLDatabase.GetDataTable("SELECT * FROM users where Username='" + std.Username + "' and Password='" + EncryptionDecryption.Encrypt(std.Password) + "' and Status='1'");
            if (table.Rows.Count > 0)
            {
                res.Status = "Successfully Login";
                string Id = table.Rows[0]["Id"].ToString();

                res.str1 = EncryptionDecryption.Encrypt(Id);

            }
            else
            {
                res.Status = "Invalid UserName/Password";
            }
            return Ok(res);
        }

        [HttpPost]
        [Route("GetAllUser")]
        public async Task<ActionResult> GetAllUser(Students std)
        {
            await Task.Delay(0);
            string Uid = EncryptionDecryption.Decrypt(std.str1);
            DataTable table = SQLDatabase.GetDataTable("select Id,Name,FatherName,Email,PhoneNumber,Gender,Address,Image from users where Status='1' ");
            return Ok(table);
        }

        [HttpPost]
        [Route("DeleteUser")]
        public async Task<ActionResult> DeleteUser(Students std)
        {
            await Task.Delay(0);
            Response res = new Response();

            var Deactivebyid = std.Deactivebyid;

            if (Deactivebyid == "" || Deactivebyid == null)
            {
                Deactivebyid = std.Deactivebyid;
            }
            else
            {
                Deactivebyid = EncryptionDecryption.Decrypt(std.Deactivebyid);
            }
            res.id = std.Id;
            if (SQLDatabase.ExecNonQuery("update users set Status=0, DeactiveDateTime='" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "', Deactivebyid='" + Deactivebyid + "' where Id=" + std.Id) > 0)
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
        [Route("UpdateUser")]
        public async Task<ActionResult> UpdateUser(Students std)
        {
            await Task.Delay(0);
            Response res = new Response();
            if (SQLDatabase.ExecNonQuery("update users set Name='" + std.Name + "',FatherName='" + std.FatherName + "',PhoneNumber='" + std.PhoneNumber + "',Email='" + std.Email + "',Gender='" + std.Gender + "',Address='" + std.Address + "'  where Id=" + std.Id) > 0)
            {
                res.Status = "Updated Successfully";
            }
            else
            {
                res.Status = "Updation Failed";
            }

            return Ok(res);
        }

        [HttpPost]
        [Route("UserProfile")]
        public async Task<ActionResult> UserProfile(Students std)
        {
            await Task.Delay(0);
            Response res = new Response();
            var Id = EncryptionDecryption.Decrypt(std.str1);
            DataTable table = SQLDatabase.GetDataTable("select Name,FatherName,Email,PhoneNumber,Gender,Address,Username from users where Id=" + Id + "");

            return Ok(table);
        }

        [HttpPost]
        [Route("ChangePassword")]
        public async Task<ActionResult> ChangePassword(PasswordChange std)
        {
            await Task.Delay(0);
            Response res = new Response();
            var Id = EncryptionDecryption.Decrypt(std.id);

            DataTable table = SQLDatabase.GetDataTable("SELECT * FROM users WHERE Id='" + Id + "' AND Password='" + EncryptionDecryption.Encrypt(std.oldPassword) + "'");

            if (table.Rows.Count > 0)
            {
                if (SQLDatabase.ExecNonQuery("update users set Password='" + EncryptionDecryption.Encrypt(std.NewPassword) + "' where Id='" + Id + "'") > 0)
                {
                    res.Status = "Password Update Successfully";
                }
                else
                {
                    res.Status = "Password Updation Failed";
                }
            }
            else
            {
                res.Status = "Old Password is Incorrect";
            }

            return Ok(res);
        }

        [HttpPost]
        [Route("GetUserData")]
        public async Task<ActionResult> GetUserData(Students std)
        {
            await Task.Delay(0);
            var Uid = std.str1;
            var userId = EncryptionDecryption.Decrypt(Uid);

            DataTable table = SQLDatabase.GetDataTable("SELECT Name,Image FROM users where Id='"+ userId + "'");
            return Ok(table);
        }

        [HttpPost]
        [Route("ChangeProfileImage")]
        public async Task<ActionResult> ChangeProfileImage()
        {
            await Task.Delay(0);
            _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

            string StudentId = Request.Form["StudentId"].ToString();

            if (Request.Form.Files.Count > 0)
            {
                string FileCompletePath = "";
                string FileExtention = "";
                string UniqueId = "";
                string BAsePath = "";
                for (int i = 0; i < Request.Form.Files.Count; i++)
                {
                    BAsePath = _environment.WebRootPath + "/uploads/";
                    UniqueId = Guid.NewGuid().ToString();
                    FileExtention = Path.GetExtension(Request.Form.Files[i].FileName);
                    FileCompletePath = BAsePath + UniqueId + FileExtention;


                    using (var FileUploadingStream = new FileStream(FileCompletePath, FileMode.Create))
                    {
                        Request.Form.Files[i].CopyTo(FileUploadingStream);
                    }
                    var userId = EncryptionDecryption.Decrypt(StudentId);

                    var filespath = "/uploads/" + UniqueId + FileExtention;

                    if (SQLDatabase.ExecNonQuery("UPDATE users SET Image = '" + filespath + "' WHERE Id =" + userId + "") == 0)
                    {
                        return Ok("File Uploaded But File Address Not Save Database");          
                    }

                }
              
                return Ok("File Uploaded successfully");
            }
            else
            {
                return Ok("No File Uploaded");
            }
        }


    }
}
