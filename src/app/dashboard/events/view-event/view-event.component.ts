import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/shared/models/interfaces/Event';
import { EventService } from 'src/shared/services/event.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit{
  events : IEvent[] = []; 

  constructor(private eventSerice: EventService) {  }

  
  ngOnInit(): void {
    this.eventSerice.createdEvents.subscribe({
      next: res => {
        this.events = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })

    this.eventSerice.getCreatedEvents();
  }
}
