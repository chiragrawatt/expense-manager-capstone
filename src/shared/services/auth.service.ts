import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../constants/api.constants';
import { ILoginRequest } from '../models/interfaces/payloads/LoginRequest';
import { IUser } from '../models/interfaces/User';
import { ILoginResponse } from '../models/interfaces/payloads/LoginResponse';
import { INotification } from '../models/interfaces/Notification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: IUser | null = null;
  isLoggedIn = false;
  authToken: string = "";

  setCurrentUser(user: IUser) {
    this.currentUser = user;
    this.isLoggedIn = true;
  }

  setAuthToken(token: string) : void {
    this.authToken = token;
    this.saveTokenToLocalStorage(token);
  }

  constructor(private http: HttpClient) {
    this.authToken = this.getTokenFromLocalStorage();
  }

  validateToken() : Observable<IUser> {
    return this.http.get<IUser>(`${API_URL}/user/validate`);
  }

  signIn(signInRequest: ILoginRequest) : Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${API_URL}/auth/signin`, signInRequest);
  }

  addUser(user: IUser) : Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/auth/signup`, user);
  }

  signOut() : void {
    this.currentUser = null
    this.isLoggedIn = false;
    this.authToken = "";
    this.saveTokenToLocalStorage(this.authToken);
  }

  saveTokenToLocalStorage(token: string) : void{
    localStorage.setItem("token", token);
  }

  getTokenFromLocalStorage() : string {
    return localStorage.getItem("token") ?? '';
  }

  isManager() : boolean {
    return this.currentUser?.roles.some(role => role.name=='ROLE_MANAGER') ?? false;
  }

  isAdmin() : boolean {
    return this.currentUser?.roles.some(role => role.name=='ROLE_ADMIN') ?? false;
  }
}
