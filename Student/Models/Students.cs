using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student.Models
{
    public class Students : CommonUse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public short Status { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public string Insertedbyid { get; set; }
        public DateTime DeactiveDateTime { get; set; }
        public string Deactivebyid { get; set; }
    }

    public class CommonUse
    {
        public string str1 { get; set; }
    }

    public class PasswordChange
    {
        public string id { get; set; }
        public string oldPassword { get; set; }
        public string NewPassword { get; set; }

    }
}
