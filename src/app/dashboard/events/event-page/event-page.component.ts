import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/shared/models/interfaces/Event';
import { IUser } from 'src/shared/models/interfaces/User';
import { EventService } from 'src/shared/services/event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})

export class EventPageComponent implements OnInit {
  event: IEvent | null = null;
  eventId: string | null = null;

  totalRemainingBudget : number = 0;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.event.subscribe({
      next: res => {
        this.event = res;
        this.totalRemainingBudget = res?.totalBudget ?? 0;
        res?.participants.forEach(pt => {
          console.log(this.totalRemainingBudget);
          this.totalRemainingBudget-=pt.spent
        }) ?? 0;
      },
      error: err => {
        console.log(err);
      }
    })

    this.route.paramMap.subscribe({
      next: param => {
        this.eventId = param.get('id');
        if (this.eventId != null) {
          this.eventService.getEventById(this.eventId);
        }
        if (this.eventId != null) {
        }
      },
      error: err => console.log(err)
    })
  }

  getInitials(name: string | undefined) : string {
    return (name ?? '').split(' ').map(n => n[0]).join('');
  }
}
