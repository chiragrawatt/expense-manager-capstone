import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutPopupComponent } from 'src/shared/components/logout-popup/logout-popup.component';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("/signin");
  }


  openDialog() {
    let dialogRef = this.dialog.open(LogoutPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.signOut();
      }
    })
  }
}
