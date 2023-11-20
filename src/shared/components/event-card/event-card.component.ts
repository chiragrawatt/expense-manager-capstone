import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/shared/models/interfaces/Event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit{
  @Input() event!: IEvent; 
  participants!: string;

  constructor() {
  }
  
  ngOnInit(): void {
    this.participants = this.event.participants.map(participant => participant.user.username).join(", ");
  }

}
