import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITeam } from '../models/interfaces/Team';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class TeamService{
  teams: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);

  constructor(private http: HttpClient) { }

  getAllTeams() : void {
    this.http.get<ITeam[]>(`${API_URL}/api/test/team`).subscribe({
      next: res => {
        this.teams.next(res);
      }
    })
  }
}
