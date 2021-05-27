using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class Speaker : ControllerBase
    {
        private readonly IProAgilRepository _repo;
        public Speaker(IProAgilRepository repo)
        {
            _repo = repo;
        }
    
        [HttpGet("{SpeakerId}")]
        public async Task<ActionResult> Get(int speakerId)
        {
            try
            {
                var result = await _repo.GetSpeakersAsyncById(speakerId, true);
                return Ok(result);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("getByName/{Name}")]
        public async Task<ActionResult> Get(string name)
        {
            try
            {
                var result = await _repo.GetAllSpeakersAsyncByName(name, true);
                return Ok(result);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }        
    }           
}