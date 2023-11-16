import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEvent } from 'src/shared/models/interfaces/Event';
import { IUser } from 'src/shared/models/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';
import { EventService } from 'src/shared/services/event.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  users : IUser[] = [];
  currentUser : IUser | null = null;
  selectedParticipants: string[] = [];
  
  searchQuery!: FormControl;
  eventForm : FormGroup = this.fb.group({});

  filteredUsers: IUser[] = [];
  teamUsers: IUser[] = [];
  otherUsers: IUser[] = [];

  constructor(private userService: UserService, private eventService : EventService, private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.currentUser = this.authService.currentUser;

    this.userService.users.subscribe({
      next: res => {
        this.users = res;
        this.teamUsers = res.filter(user => {
          return user.id!==this.currentUser?.id && user.team.id==this.currentUser?.team.id;
        })
        this.otherUsers = res.filter(user => {
          return user.id!==this.currentUser?.id && user.team.id!==this.currentUser?.team.id;
        })
      },
      error: err => {
        console.log(err);
      }
    })

    this.userService.getAllUsers();
    this.searchOnChange();
  }

  initForm() {
    this.searchQuery = this.fb.control('');

    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      budget: [null , [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['']
    })
  }

  searchOnChange() {
    this.searchQuery.valueChanges.subscribe({
      next: (res) => {
        this.filterUsers(res);
      }
    })
  }

  showForm() {
    console.log(this.eventForm);
  }


  toggleSelectedUser(userId: string) : void{
    let idx = this.selectedParticipants.indexOf(userId);

    if(idx==-1) {
      this.selectedParticipants.push(userId);
    } else {
      this.selectedParticipants.splice(idx, 1);
    }
  }

  filterUsers(searchText: string) : void{
    if(searchText.length==0) {
      this.filteredUsers = [];
      return;
    }

    this.filteredUsers = this.users.filter(user => user.username.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) && user.id!==this.currentUser?.id);
  }

  onSubmit() {
    let eventData : IEvent = this.eventForm.getRawValue();

    if(this.currentUser!=null) {
      eventData.creator = this.currentUser;
    }

    eventData.participants = this.users.filter(user => this.selectedParticipants.includes(user.id));
    eventData.isActive = true;

    this.eventService.addEvent(eventData).subscribe({
      next: res => {
        console.log(res);
        this.router.navigateByUrl("/dashboard/events/view")
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
