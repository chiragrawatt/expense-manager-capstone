import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRole } from 'src/shared/models/interfaces/Role';
import { ITeam } from 'src/shared/models/interfaces/Team';
import { IUser } from 'src/shared/models/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';
import { TeamService } from 'src/shared/services/team.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  teams: ITeam[] = [];
  roles: IRole[] = [
    {
      id: "6550ac8928e194e6dac8b96b",
      name: "ROLE_EMPLOYEE"
    }, {
      id: "655233b9b8548117ec67123d",
      name: "ROLE_MANAGER"
    }
  ];

  userForm: FormGroup = this.fb.group({});

  constructor(private authService: AuthService, private teamService: TeamService, private fb: FormBuilder) { }

  onSubmit() {
    let formdata: IUser = this.userForm.getRawValue();

    this.authService.addUser(formdata).subscribe({
      next: res => {
        console.log(res);
      }
    })
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      team: [null, [Validators.required]],
      role: [null, [Validators.required]]
    });

    this.teamService.teams.subscribe({
      next: res => {
        this.teams = res;
      }
    })

    this.teamService.getAllTeams();
  }

}
