import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceiptPopupComponent } from 'src/shared/components/receipt-popup/receipt-popup.component';
import { IExpense } from 'src/shared/models/interfaces/Expense';
import { EExpenseStatus } from 'src/shared/models/interfaces/ExpenseStatus';
import { ExpenseService } from 'src/shared/services/expense.service';

@Component({
  selector: 'app-pending-expenses',
  templateUrl: './pending-expenses.component.html',
  styleUrls: ['./pending-expenses.component.scss']
})
export class PendingExpensesComponent  implements OnInit {
  pendingExpenses: IExpense[] = [];

  constructor(private expenseService: ExpenseService, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.expenseService.pendingExpenses.subscribe({
      next: res => {
        this.pendingExpenses = res;
      },
      error: err => {
        console.log(err);
      }
    })

    this.expenseService.getExpensesForManagerWithStatus(EExpenseStatus.PENDING);
  }

  approveExpense(expenseId: string) {
    this.expenseService.chageExpenseStatus(expenseId, EExpenseStatus.APPROVED).subscribe({
      next: res => {
        console.log(res);
        this.expenseService.getExpensesForManagerWithStatus(EExpenseStatus.PENDING)
      },
      error: err => {
        console.log(err);
      }
    })
  }

  rejectExpense(expenseId: string) {
    this.expenseService.chageExpenseStatus(expenseId, EExpenseStatus.REJECTED).subscribe({
      next: res => {
        console.log(res);
        this.expenseService.getExpensesForManagerWithStatus(EExpenseStatus.PENDING)
      },
      error: err => {
        console.log(err);
      }
    })
  }

  openDialog(expenseId: String): void {
    const dialogRef = this.dialog.open(ReceiptPopupComponent, {
      data: {id: expenseId},
    });
  }

}
