import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './dashboard/events/events.component';
import { ExpensesComponent } from './dashboard/expenses/expenses.component';
import { TeamComponent } from './dashboard/team/team.component';
import { AddEventComponent } from './dashboard/events/add-event/add-event.component';
import { ViewEventComponent } from './dashboard/events/view-event/view-event.component';
import { isLoggedIn } from 'src/shared/auth.gaurd';
import { EventPageComponent } from './dashboard/events/event-page/event-page.component';
import { AddExpenseComponent } from './dashboard/expenses/add-expense/add-expense.component';
import { ViewExpenseComponent } from './dashboard/expenses/view-expense/view-expense.component';
import { ExpenseRequestsComponent } from './dashboard/expenses/expense-requests/expense-requests.component';
import { PendingExpensesComponent } from './dashboard/expenses/pending-expenses/pending-expenses.component';

const routes: Routes = [
  {path: "signin", component: SigninComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [isLoggedIn], canActivateChild: [isLoggedIn],
  children: [
    {path: "events", component: EventsComponent, children: [
      {path: "add", component: AddEventComponent},
      {path: "view", component: ViewEventComponent},
      {path: "view/:id", component: EventPageComponent},
      {path: "", redirectTo: "view", pathMatch: "full"}
    ]},
    {path: "expenses", component: ExpensesComponent, children: [
      {path: "view", component: ViewExpenseComponent},
      {path: "add", component: AddExpenseComponent},
      {path: "requests", component: ExpenseRequestsComponent},
      {path: "pending", component: PendingExpensesComponent},
      {path: "", redirectTo: "view", pathMatch: "full"}
    ]},
    {path: "team", component: TeamComponent},
    {path: "", redirectTo: "expenses", pathMatch: "full"}
  ]},
  {path: "", redirectTo: "signin", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
