using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class SpeakerDto
    {

       public int Id { get; set; }
        [Required (ErrorMessage ="The field {0} is required")]
        public string Name { get; set; }
        public string MiniCurriculum { get; set; }
        public string ImageUrl { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public List<SocialNetworkDto> SocialNetworks {get; set;}
        public List<EventDto> Events { get; set; } 
    }
}