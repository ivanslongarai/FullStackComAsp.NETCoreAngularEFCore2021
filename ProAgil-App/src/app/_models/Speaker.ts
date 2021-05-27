import { SocialNetwork } from "./SocialNetwork";
import { Event } from "./Event";

export interface Speaker {
  id: number;
  interface: string;
  miniCurriculum: string;
  imageUrl : string;
  phone: string;
  email: string;
  socialNetworks: SocialNetwork[];
  speakerEvents: Event[];
}
