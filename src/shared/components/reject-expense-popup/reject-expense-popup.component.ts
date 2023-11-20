import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EExpenseStatus } from 'src/shared/models/enums/ExpenseStatus';
import { ENotificationType } from 'src/shared/models/enums/NotificationType';
import { IExpense } from 'src/shared/models/interfaces/Expense';
import { AuthService } from 'src/shared/services/auth.service';
import { ExpenseService } from 'src/shared/services/expense.service';
import { UserService } from 'src/shared/services/user.service';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';

@Component({
  selector: 'app-reject-expense-popup',
  templateUrl: './reject-expense-popup.component.html',
  styleUrls: ['./reject-expense-popup.component.scss']
})
export class RejectExpensePopupComponent {
  expense!: IExpense;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<RejectExpensePopupComponent>){

  }

  closeDialog(message: string) {
    console.log(message);
    this.dialogRef.close({data: {
      reject: true,
      message: message
    }})
  }
}
