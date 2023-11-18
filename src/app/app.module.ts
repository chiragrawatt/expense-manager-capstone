import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadersInterceptor } from 'src/shared/iterceptors/headers.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { EventsComponent } from './dashboard/events/events.component';
import { ExpensesComponent } from './dashboard/expenses/expenses.component';
import { TeamComponent } from './dashboard/team/team.component';
import { AddEventComponent } from './dashboard/events/add-event/add-event.component';
import { ViewEventComponent } from './dashboard/events/view-event/view-event.component';
import { EventPageComponent } from './dashboard/events/event-page/event-page.component';
import { AddExpenseComponent } from './dashboard/expenses/add-expense/add-expense.component';
import { ViewExpenseComponent } from './dashboard/expenses/view-expense/view-expense.component';
import { PendingExpensesComponent } from './dashboard/expenses/pending-expenses/pending-expenses.component';
import { ExpensePageComponent } from './dashboard/expenses/expense-page/expense-page.component';
import { ExpenseRequestsComponent } from './dashboard/expenses/expense-requests/expense-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    EventsComponent,
    ExpensesComponent,
    TeamComponent,
    AddEventComponent,
    ViewEventComponent,
    EventPageComponent,
    AddExpenseComponent,
    ViewExpenseComponent,
    PendingExpensesComponent,
    ExpensePageComponent,
    ExpenseRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
