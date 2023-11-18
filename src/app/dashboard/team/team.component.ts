import { Component, OnInit } from '@angular/core';
import { ITeam } from 'src/shared/models/interfaces/Team';
import { IUser } from 'src/shared/models/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: ITeam | null = null;
  teamUsers: IUser[] = [];

  managers : IUser[] = [];
  members : IUser[] = [];

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.team = this.authService.currentUser?.team ?? null;

    this.userService.teamUsers.subscribe({
      next: res => {
        this.teamUsers = res;
        this.managers = res.filter(user => user.roles.some(role => role.name=="ROLE_MANAGER"));
        this.members = res.filter(user => !user.roles.some(role => role.name=="ROLE_MANAGER"));
      },
      error: err => {
        console.log(err);
      }
    })

    if(this.team!=null) {
      this.userService.getUsersByTeam(this.team)
    }
  }

  getInitials(name: string | undefined) : string {
    return (name ?? '').split(' ').map(n => n[0]).join('');
  }
}
