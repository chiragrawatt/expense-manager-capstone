import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceiptPopupComponent } from 'src/shared/components/receipt-popup/receipt-popup.component';
import { IEventParticipant } from 'src/shared/models/interfaces/EventParticipant';
import { IExpense } from 'src/shared/models/interfaces/Expense';
import { EExpenseStatus } from 'src/shared/models/enums/ExpenseStatus';
import { ExpenseService } from 'src/shared/services/expense.service';
import { UserService } from 'src/shared/services/user.service';
import { AuthService } from 'src/shared/services/auth.service';
import { ENotificationType } from 'src/shared/models/enums/NotificationType';
import { RejectExpensePopupComponent } from 'src/shared/components/reject-expense-popup/reject-expense-popup.component';

@Component({
  selector: 'app-pending-expenses',
  templateUrl: './pending-expenses.component.html',
  styleUrls: ['./pending-expenses.component.scss']
})
export class PendingExpensesComponent implements OnInit {
  pendingExpenses: IExpense[] = [];

  constructor(private expenseService: ExpenseService, private userService: UserService, private authService: AuthService, public dialog: MatDialog) {

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

  openRejectDialog(expense: IExpense): void {
    let dialogRef = this.dialog.open(RejectExpensePopupComponent, {
      data: { expense }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.data.reject != null && result.data.reject == true) {
        expense.rejectionMessage = result.data.message;
        this.rejectExpense(expense);
      }
    })
  }

  approveExpense(expense: IExpense) {
    this.expenseService.chageExpenseStatus(expense.id, EExpenseStatus.APPROVED).subscribe({
      next: res => {
        console.log(res);
        this.expenseService.getExpensesForManagerWithStatus(EExpenseStatus.PENDING)
        this.userService.notifyUser({
          message: `Your expense ${expense.description} for event ${expense.event.title} has been approved by ${this.authService.currentUser?.username}`,
          navLink: "/dashboard/expenses/view",
          type: ENotificationType.POSITIVE,
          isVisited: false
        }, expense.creator.id).subscribe({
          next: res => {
            console.log(res);
          },
          error: err => {
            console.log(err);
          }
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }

  rejectExpense(expense: IExpense) {
    this.expenseService.addExpense(expense).subscribe({
      next: res => {
        console.log(res);
        this.expenseService.chageExpenseStatus(expense.id, EExpenseStatus.REJECTED).subscribe({
          next: res => {
            console.log(res);
            this.expenseService.getExpensesForManagerWithStatus(EExpenseStatus.PENDING);

            this.userService.notifyUser({
              message: `Your expense ${expense.description} for event ${expense.event.title} has been rejected by ${this.authService.currentUser?.username} for reason ${expense.rejectionMessage}`,
              navLink: "/dashboard/expenses/view",
              type: ENotificationType.NEGATIVE,
              isVisited: false
            }, expense.creator.id).subscribe({
              next: res => {
                console.log(res);
              },
              error: err => {
                console.log(err);
              }
            })
          },
          error: err => {
            console.log(err);
          }
        })
      }
    })


  }

  openDialog(expenseId: String): void {
    const dialogRef = this.dialog.open(ReceiptPopupComponent, {
      data: { id: expenseId },
    });
  }

  getRemainingBudget(expense: IExpense): number {
    let participant: IEventParticipant = expense.event.participants.filter(participant => {
      return participant.user.id == expense.creator.id;
    })[0];
    return participant.budget - participant.spent;
  }
}
