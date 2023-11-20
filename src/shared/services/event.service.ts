import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../models/interfaces/Event';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  event : BehaviorSubject<IEvent | null> = new BehaviorSubject<IEvent | null>(null);
  createdEvents : BehaviorSubject<IEvent[]> = new BehaviorSubject<IEvent[]>([]);
  participatedEvents : BehaviorSubject<IEvent[]> = new BehaviorSubject<IEvent[]>([]);

  constructor(private http: HttpClient) { }

  getCreatedEvents() : void {
    this.createdEvents.next([]);
    console.log("created events called");
    this.http.get<IEvent[]>(`${API_URL}/event/manager`).subscribe({
      next: res => {
        this.createdEvents.next(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getParticipatedEvents() : void {
    this.participatedEvents.next([]);
    this.http.get<IEvent[]>(`${API_URL}/event/employee`).subscribe({
      next: res => {
        this.participatedEvents.next(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getEventById(eventId: string) : void {
    this.event.next(null);
    this.http.get<IEvent>(`${API_URL}/event/${eventId}`).subscribe({
      next: res => {
        this.event.next(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  addEvent(event: IEvent) : Observable<IEvent> {
    return this.http.post<IEvent>(`${API_URL}/event`, event);
  }

  addEvents(events: IEvent[]) : Observable<number> {
    return this.http.post<number>(`${API_URL}/event`, events);
  }
}
