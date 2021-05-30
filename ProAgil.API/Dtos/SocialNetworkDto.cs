using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class SocialNetworkDto
    {
        public int Id { get; set; }
        [Required (ErrorMessage ="The field {0} is required")]
        public string Name { get; set; }
        [Required (ErrorMessage ="The field {0} is required")]
        public string ImageUrl { get; set; }
    }
}