using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;       
        Task<bool> SaveChangesAsync();
        
        //Events
        Task<Event[]> GetAllEventsAsyncBySubject(string eventSubject, bool includeSpeakers);
        Task<Event[]> GetAllEventsAsync(bool includeSpeakers);
        Task<Event> GetEventsAsyncById(int eventId, bool includeSpeakers);

        //Speakers
        Task<Speaker[]> GetAllSpeakersAsyncByName(string speakerName, bool includeEvents);
        Task<Speaker> GetSpeakersAsyncById(int speakerId, bool includeEvents);


    }
}