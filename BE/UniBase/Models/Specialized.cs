using System;
using System.Collections.Generic;

namespace UniBase.Models
{
    public partial class Specialized
    {
        public Specialized()
        {
            Users = new HashSet<ApplicationUser>();
        }

        public int SpecializedId { get; set; }
        public string Name { get; set; } = null!;
        public int? DepartmentId { get; set; }

        public virtual Department? Department { get; set; }
        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}
