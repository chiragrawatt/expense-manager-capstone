import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/interfaces/User';
import { API_URL } from '../constants/api.constants';
import { ITeam } from '../models/interfaces/Team';
import { INotification } from '../models/interfaces/Notification';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  teamUsers : BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  notifications: BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>([]);

  constructor(private http: HttpClient) { }

  notifyUser(notification: INotification, userId: string) : Observable<INotification> {
    return this.http.put<INotification>(`${API_URL}/user/notify/${userId}`, notification);
  }

  setNotificationsToVisited() : void {
    this.http.get<INotification[]>(`${API_URL}/user/notifications/visit`).subscribe({
      next: res => {
        console.log(res);
        this.notifications.next(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getAllUsers() : void {
    this.http.get<IUser[]>(`${API_URL}/user`).subscribe({
      next: res => {
        console.log(res);
        this.users.next(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getUsersByTeam(team: ITeam) : void {
    this.http.post<IUser[]>(`${API_URL}/user/team`, team).subscribe({
      next: res => {
        this.teamUsers.next(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getNotifications() : void {
    this.http.get<INotification[]>(`${API_URL}/user/notifications`).subscribe({
      next: res => {
        console.log(res);
        this.notifications.next(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
