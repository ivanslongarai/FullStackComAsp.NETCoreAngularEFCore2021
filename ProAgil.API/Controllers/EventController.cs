using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IProAgilRepository _repo;
        public EventController(IProAgilRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllEventsAsync(true);
                return Ok(result);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("{EventId}")]
        public async Task<ActionResult> Get(int eventId)
        {
            try
            {
                var result = await _repo.GetEventsAsyncById(eventId, true);
                return Ok(result);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("getBySubject/{subject}")]
        public async Task<ActionResult> Get(string subject)
        {
            try
            {
                var result = await _repo.GetAllEventsAsyncBySubject(subject, true);
                return Ok(result);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(Event model)
        {
            try
            {
                _repo.Add(model);

                if (await _repo.SaveChangesAsync())
                    return Created($"/api/event/{model.Id}", model);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return BadRequest();
        }

        [HttpPut("{eventId}")]
        public async Task<ActionResult> Put(int eventId, Event model)
        {
            try
            {
                var _event = await _repo.GetEventsAsyncById(eventId, false);

                if (_event == null)
                    return NotFound();

                _repo.Update(model);

                Console.WriteLine(model);

                if (await _repo.SaveChangesAsync())
                    return Created($"/api/event/{model.Id}", model);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{eventId}")]
        public async Task<ActionResult> Delete(int eventId)
        {
            try
            {
                var _event = await _repo.GetEventsAsyncById(eventId, false);

                if (_event == null)
                    return NotFound();

                _repo.Delete(_event);

                if (await _repo.SaveChangesAsync())
                    return Ok();
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return BadRequest();
        }

    }
}