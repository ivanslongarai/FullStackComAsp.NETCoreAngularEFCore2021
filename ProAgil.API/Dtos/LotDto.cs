using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class LotDto
    {
        public int Id { get; set; }        
        [Required (ErrorMessage ="The field {0} is required")]
        public string Name { get; set; }
        [Required (ErrorMessage ="The field {0} is required")]
        public decimal Price { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        [Range (2, 120000)]
        public int Amount { get; set; }
    }
}