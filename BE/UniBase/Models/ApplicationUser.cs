using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniBase.Models
{
    public class ApplicationUser : IdentityUser<int>
    {
        [NotMapped]
        public string? ClassName { get; set; }
        [NotMapped]
        public string? DepartmentName { get; set; }

        public ApplicationUser()
        {
            Comments = new HashSet<Comment>();
            ProjectLists = new HashSet<ProjectList>();
        }

        public int? checkComment { get; set; }
        
        public int? DepartmentId { get; set; }
        public int? ClassId { get; set; }
        public string? Name { get; set; } = null!;
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Sex { get; set; }
        public string? Image { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public virtual Department? Department { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<Comment>? Comments { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<ProjectList>? ProjectLists { get; set; }
    }
}
