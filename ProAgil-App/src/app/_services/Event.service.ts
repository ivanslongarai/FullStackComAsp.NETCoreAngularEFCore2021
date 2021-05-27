import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../_models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  baseUrl = 'http://localhost:5000/api/event';

  constructor(private http: HttpClient) {}

  getAllEvents() : Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventBySubject(subject : string) : Observable<Event[]> {
  return this.http.get<Event[]>(`${this.baseUrl}/getBySubject/${subject}`);
  }

  getEventById(id : number) : Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

}
