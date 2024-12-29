using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\\d))(?=(.*[\\W_])).{6,}$", ErrorMessage = "Password is not complex enough.")]
        public string Password { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
