using System.Linq;
using AutoMapper;
using ProAgil.API.Dtos;
using ProAgil.Domain;

namespace ProAgil.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Domain, ApiDto
            CreateMap<Event, EventDto>()
                .ForMember(dest => dest.Speakers, opt =>
                {
                    opt.MapFrom(src => src.SpeakerEvents.Select(x => x.Speaker).ToList());
                }).ReverseMap();

            CreateMap<Speaker, SpeakerDto>()
                .ForMember(dest => dest.Events, opt =>
                {
                    opt.MapFrom(src => src.SpeakerEvents.Select(x => x.Event).ToList());
                }).ReverseMap();

            CreateMap<Lot, LotDto>().ReverseMap();
            CreateMap<SocialNetwork, SocialNetworkDto>().ReverseMap();
        }
    }
}