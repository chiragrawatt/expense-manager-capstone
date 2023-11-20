import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { ReceiptPopupComponent } from './components/receipt-popup/receipt-popup.component';
import { LogoutPopupComponent } from './components/logout-popup/logout-popup.component';
import { RejectExpensePopupComponent } from './components/reject-expense-popup/reject-expense-popup.component';
import { NotificationsDialogComponent } from './components/notifications-dialog/notifications-dialog.component';



@NgModule({
  declarations: [
    LoaderComponent,
    EventCardComponent,
    ReceiptPopupComponent,
    LogoutPopupComponent,
    RejectExpensePopupComponent,
    NotificationsDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    LoaderComponent,
    EventCardComponent,
    ReceiptPopupComponent,
    LogoutPopupComponent,
    NotificationsDialogComponent
  ]
})
export class SharedModule { }
