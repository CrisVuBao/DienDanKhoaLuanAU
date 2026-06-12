using System;
using System.Collections.Generic;

namespace UniBase.Models
{
    public partial class Department
    {
        public Department()
        {
            Specializeds = new HashSet<Specialized>();
            Users = new HashSet<ApplicationUser>();
            ProjectLists = new HashSet<ProjectList>();
        }

        public int DepartmentId { get; set; }
        public string? Name { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<Specialized> Specializeds { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<ApplicationUser> Users { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<ProjectList> ProjectLists { get; set; }
    }
}
