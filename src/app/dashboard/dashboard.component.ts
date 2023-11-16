import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router) {}

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("/signin");
  }
}
