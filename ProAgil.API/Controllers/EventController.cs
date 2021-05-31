using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.API.Dtos;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController] //For avoiding to have to inform [FromBody] on Params and informing to use Data notations
    public class EventController : ControllerBase
    {
        private readonly IProAgilRepository _repo;
        private readonly IMapper _mapper;
        public EventController(IProAgilRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var events = await _repo.GetAllEventsAsync(true);
                var results = _mapper.Map<EventDto[]>(events);
                return Ok(results);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost("upload")]
        public async Task<ActionResult> Upload()
        {
            try
            {

                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");               
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0){
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, fileName.Replace("\"", " ").Trim());
                    using(var stream = new FileStream(fullPath, FileMode.Create)){
                        file.CopyTo(stream);
                    }
                }

                return Ok();
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
                var _event = await _repo.GetEventsAsyncById(eventId, true);
                //event to dto
                var result = _mapper.Map<EventDto>(_event);                
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
                var _event = await _repo.GetAllEventsAsyncBySubject(subject, true);
                var results = _mapper.Map<EventDto[]>(_event);
                return Ok(results);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(EventDto model)
        {
            try
            {

                //dto to event
                var _event = _mapper.Map<Event>(model);

                _repo.Add(_event);

                if (await _repo.SaveChangesAsync())
                    return Created($"/api/event/{_event.Id}", _mapper.Map<EventDto>(_event));
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return BadRequest();
        }

        [HttpPut("{eventId}")]
        public async Task<ActionResult> Put(int eventId, EventDto model)
        {
            try
            {
                var _event = await _repo.GetEventsAsyncById(eventId, false);

                if (_event == null)
                    return NotFound();

                _mapper.Map(model, _event);    

                _repo.Update(_event);

                if (await _repo.SaveChangesAsync())
                    return Created($"/api/event/{_event.Id}", _mapper.Map<EventDto>(_event));
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