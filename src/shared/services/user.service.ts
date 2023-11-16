import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/interfaces/User';
import { API_URL } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  constructor(private http: HttpClient) { }

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
}
