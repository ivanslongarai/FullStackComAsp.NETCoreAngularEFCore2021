import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../_models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  baseUrl = 'http://localhost:5000/api/event';

  constructor(private http: HttpClient) {
    }

  getAllEvents() : Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventBySubject(subject : string) : Observable<Event[]> {
  return this.http.get<Event[]>(`${this.baseUrl}/getBySubject/${subject}`);
  }

  getEventById(id : number) : Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  postEvent(event : Event) {
    return this.http.post(this.baseUrl, event);
  }

  putEvent(event : Event) {
    return this.http.put(`${this.baseUrl}/${event.id}`, event);
  }

  deleteEvent(id : number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  postUpload(file : File, name : string){
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append("file", fileToUpload, name);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

}
