using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class EventDto
    {
        public int Id { get; set; }
        [Required (ErrorMessage ="Local is required")]
        [StringLength (50, MinimumLength = 4, ErrorMessage = "The field Local must be a string with a minimum length of 4 and a maximum length of 50.")]
        public string Local { get; set; }
        public string Date { get; set; }
        [Required(ErrorMessage = "Subject is required")]
        public string Subject { get; set; }
        [Range(1, 120000, ErrorMessage = "The field Amount must be between 1 and 120000.")]
        public int Amount { get; set; }
        public string ImageUrl { get; set; }
        [Phone]
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public List<LotDto> Lots { get; set; }
        public List<SocialNetworkDto> SocialNetworks { get; set; }
        public List<SpeakerDto> Speakers { get; private set; }
    }
}