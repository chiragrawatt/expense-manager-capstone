import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutPopupComponent } from 'src/shared/components/logout-popup/logout-popup.component';
import { NotificationsDialogComponent } from 'src/shared/components/notifications-dialog/notifications-dialog.component';
import { ENotificationType } from 'src/shared/models/enums/NotificationType';
import { INotification } from 'src/shared/models/interfaces/Notification';
import { AuthService } from 'src/shared/services/auth.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notifications: INotification[] = [];

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.notifications.subscribe({
      next: res => {
        this.notifications = res.filter(notif => notif.isVisited==false);
      },
      error: err => {
        console.log(err);
      }
    })

    this.userService.getNotifications();
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("/signin");
  }

  openLougOutDialog() {
    let dialogRef = this.dialog.open(LogoutPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.signOut();
      }
    })
  }

  openNotificationsDialog() {
    this.dialog.open(NotificationsDialogComponent);
  }
}
