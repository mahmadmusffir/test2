using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student.Models
{
    public class Courses
    {
        public int Courseid { get; set; }
        public string Coursetitle { get; set; }
        public string Description { get; set; }
        public string Fee { get; set; }
        public short Status { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public string Insertedbyid { get; set; }
        public DateTime DeactiveDateTime { get; set; }
        public string Deactivebyid { get; set; }
        public int BindId { get; set; }
    }
}
