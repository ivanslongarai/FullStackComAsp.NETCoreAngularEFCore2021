using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public class ProAgilRepository : IProAgilRepository
    {
        private readonly ProAgilContext _context;

        public ProAgilRepository(ProAgilContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        //general
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        //events
        public async Task<Event[]> GetAllEventsAsync(bool includeSpeakers = false)
        {
            IQueryable<Event> query = _context.Events
                .Include(l => l.Lots)
                .Include(sn => sn.SocialNetworks);

            if (includeSpeakers)
                query = query.Include(se => se.SpeakerEvents)
                    .ThenInclude(s => s.Speaker);

            query = query.AsNoTracking().OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Event[]> GetAllEventsAsyncBySubject(string eventSubject, bool includeSpeakers = false)
        {
            IQueryable<Event> query = _context.Events
                .Include(l => l.Lots)
                .Include(sn => sn.SocialNetworks);

            if (includeSpeakers)
                query = query.Include(se => se.SpeakerEvents)
                    .ThenInclude(s => s.Speaker);

            query = query.AsNoTracking().OrderByDescending(e => e.Date)
                .Where(e => e.Subject.ToLower().Contains(eventSubject.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Event> GetEventsAsyncById(int eventId, bool includeSpeakers = false)
        {
            IQueryable<Event> query = _context.Events
                .Include(l => l.Lots)
                .Include(sn => sn.SocialNetworks);

            if (includeSpeakers)
                query = query.Include(se => se.SpeakerEvents)
                .ThenInclude(s => s.Speaker);

            query = query.AsNoTracking().Where(e => e.Id == eventId);

            return await query.FirstOrDefaultAsync();
        }

        //speakers
        public async Task<Speaker> GetSpeakersAsyncById(int speakerId, bool includeEvents = false)
        {
            IQueryable<Speaker> query = _context.Speakers
                 .Include(sn => sn.SocialNetworks);

            if (includeEvents)
                query = query.Include(se => se.SpeakerEvents)
                    .ThenInclude(e => e.Event);

            query = query.AsNoTracking().Where(s => s.Id == speakerId);

            return await query.SingleOrDefaultAsync();
        }

        public async Task<Speaker[]> GetAllSpeakersAsyncByName(string speakerName, bool includeEvents = false)
        {
            IQueryable<Speaker> query = _context.Speakers
                .Include(sn => sn.SocialNetworks);

            if (includeEvents)
                query = query.Include(se => se.SpeakerEvents)
                .ThenInclude(e => e.Event);

            query = query.AsNoTracking().OrderBy(s => s.Name)
                .Where(s => s.Name.ToLower().Contains(speakerName.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}