import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/shared/models/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: IUser | null = null;
  profile: string | undefined;
  navData: any[] = []

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.profile = this.user?.username?.split(" ")?.map(word => word[0])?.join("");

    if(this.authService.isAdmin()) {
      this.navData = [
        {
          title: "Events",
          path: "events/view",
          icon: "bi bi-calendar-event-fill"
        },
        {
          title: "Add Event",
          path: "events/add",
          icon: "bi bi-patch-plus-fill"
        },
        {
          title: "Expenses",
          path: "expenses/view",
          icon: "bi bi-wallet-fill"
        },
        {
          title: "Add Expense",
          path: "expenses/add",
          icon: "bi bi-receipt"
        },
        {
          title: "Pending Expenses",
          path: "expenses/pending",
          icon: "bi bi-card-checklist"
        },
        {
          title: "Team",
          path: "team",
          icon: "bi bi-people-fill"
        },
        {
          title: "Add User",
          path: "user/add",
          icon: "bi bi-person-fill-add"
        }
      ]
    } else if(this.authService.isManager()) {
      this.navData = [
        {
          title: "Events",
          path: "events/view",
          icon: "bi bi-calendar-event-fill"
        },
        {
          title: "Add Event",
          path: "events/add",
          icon: "bi bi-patch-plus-fill"
        },
        {
          title: "Expenses",
          path: "expenses/view",
          icon: "bi bi-wallet-fill"
        },
        {
          title: "Add Expense",
          path: "expenses/add",
          icon: "bi bi-receipt"
        },
        {
          title: "Pending Expenses",
          path: "expenses/pending",
          icon: "bi bi-card-checklist"
        },
        {
          title: "Team",
          path: "team",
          icon: "bi bi-people-fill"
        }
      ]
    } else {
      this.navData = [
        {
          title: "Expenses",
          path: "expenses/view",
          icon: "bi bi-wallet-fill"
        },
        {
          title: "Add Expense",
          path: "expenses/add",
          icon: "bi bi-receipt"
        },
        {
          title: "Team",
          path: "team",
          icon: "bi bi-people-fill"
        }
      ]
    }
  }

}
