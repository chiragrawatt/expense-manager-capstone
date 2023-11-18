import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EXPENSE_DISPLAYED_COLUMNS } from 'src/shared/constants/app.constants';
import { IExpense } from 'src/shared/models/interfaces/Expense';
import { EExpenseStatus } from 'src/shared/models/interfaces/ExpenseStatus';
import { ExpenseService } from 'src/shared/services/expense.service';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.scss']
})
export class ViewExpenseComponent implements OnInit {
  expenseData : IExpense[] = [];
  displayedColumns : string[] = EXPENSE_DISPLAYED_COLUMNS;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private expenseService: ExpenseService) {
    
  }

  ngOnInit(): void {
    this.expenseService.createdExpenses.subscribe({
      next: res => {
        this.expenseData = res;
        this.paginator.length = res.length;
        console.log(res);
      },
      error: err => {
        console.log("error", err);
      }
    })

    this.expenseService.getCreatedExpenses();
  }

  getStatusClass(status: EExpenseStatus) : string {
    if(status == EExpenseStatus.PENDING) {
      return "btn"
    }
    if(status == EExpenseStatus.REJECTED) {
      return "disabled btn"
    }
    if(status == EExpenseStatus.APPROVED) {
      return "disabled btn"
    }
    console.log("reched");
    return "";
  }
}
