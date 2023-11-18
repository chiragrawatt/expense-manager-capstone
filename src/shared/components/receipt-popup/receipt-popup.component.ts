import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IExpense } from 'src/shared/models/interfaces/Expense';
import { ExpenseService } from 'src/shared/services/expense.service';

@Component({
  selector: 'app-receipt-popup',
  templateUrl: './receipt-popup.component.html',
  styleUrls: ['./receipt-popup.component.scss']
})
export class ReceiptPopupComponent implements OnInit {
  expense: IExpense | null = null;
  imageSrc : String = "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private expenseService: ExpenseService) {
    
  }

  ngOnInit(): void {
    console.log(this.data.id);
    this.expenseService.expense.subscribe({
      next: res => {
        this.expense = res;
        if(res?.receipt != null && res?.receipt.length>0) {
          this.imageSrc = this.expense?.receipt ?? this.imageSrc;
        }
        console.log(this.expense);
      },
      error: err => {
        console.log(err);
      }
    })

    this.expenseService.getExpenseById(this.data.id); 
  }
}
