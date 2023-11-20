import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ENotificationType } from 'src/shared/models/enums/NotificationType';
import { INotification } from 'src/shared/models/interfaces/Notification';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.scss']
})
export class NotificationsDialogComponent implements OnInit{
  // notifications : INotification[] = [
  //   {
  //     navLink: "/dashboard/events/view",
  //     type: ENotificationType.NEUTRAL,
  //     message: "Chirag Rawat just added you to an event",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/pending",
  //     type: ENotificationType.NEUTRAL,
  //     message: "You have an expense request from Taha Habib",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/view",
  //     type: ENotificationType.POSITIVE,
  //     message: "Your expense bla bla for event bla bla has been approved by Chirag Rawat",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/view",
  //     type: ENotificationType.NEGATIVE,
  //     message: "Your expense bla bla for event bla bla has been rejected by Chirag Rawat",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/events/view",
  //     type: ENotificationType.NEUTRAL,
  //     message: "Chirag Rawat just added you to an event",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/pending",
  //     type: ENotificationType.NEUTRAL,
  //     message: "You have an expense request from Taha Habib",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/view",
  //     type: ENotificationType.POSITIVE,
  //     message: "Your expense bla bla for event bla bla has been approved by Chirag Rawat",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/view",
  //     type: ENotificationType.NEGATIVE,
  //     message: "Your expense bla bla for event bla bla has been rejected by Chirag Rawat",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/events/view",
  //     type: ENotificationType.NEUTRAL,
  //     message: "Chirag Rawat just added you to an event",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/pending",
  //     type: ENotificationType.NEUTRAL,
  //     message: "You have an expense request from Taha Habib",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/view",
  //     type: ENotificationType.POSITIVE,
  //     message: "Your expense bla bla for event bla bla has been approved by Chirag Rawat",
  //     isVisited: false
  //   },
  //   {
  //     navLink: "/dashboard/expenses/view",
  //     type: ENotificationType.NEGATIVE,
  //     message: "Your expense bla bla for event bla bla has been rejected by Chirag Rawat",
  //     isVisited: false
  //   }
  // ];

  notifications: INotification[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.notifications.subscribe({
      next: res => {
        console.log(res);
        this.notifications = res;
      },
      error: err => {
        console.log(err);
      }
    })

    this.userService.getNotifications();
    this.userService.setNotificationsToVisited();
  }

  notificationTypes() : typeof ENotificationType {
    return ENotificationType;
  }

  navigateToPage(link: string) {
    this.router.navigateByUrl(link);
  }
}
