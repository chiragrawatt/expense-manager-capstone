import { Injectable } from '@angular/core';
import { IExpense } from '../models/interfaces/Expense';
import { API_URL } from '../constants/api.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expense : BehaviorSubject<IExpense | null> = new BehaviorSubject<IExpense | null>(null);
  expenses : BehaviorSubject<IExpense[]> = new BehaviorSubject<IExpense[]>([]);

  constructor(private http: HttpClient) { }

  getCreatedExpenses() : void {
    this.expenses.next([]);
    this.http.get<IExpense[]>(`${API_URL}/expense`).subscribe({
      next: res => {
        this.expenses.next(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // getParticipatedexpenses() : void {
  //   this.http.get<IExpense[]>(`${API_URL}/expense/employee`).subscribe({
  //     next: res => {
  //       this.expenses.next(res);
  //     },
  //     error: err => {
  //       this.expenses.error(err);
  //     }
  //   })
  // }

  getExpenseById(expenseId: string) : void {
    this.http.get<IExpense>(`${API_URL}/expense/${expenseId}`).subscribe({
      next: res => {
        this.expense.next(res);
      },
      error: err => {
        this.expense.error(err);
      }
    })
  }

  addExpense(expense: IExpense) : Observable<IExpense> {
    return this.http.post<IExpense>(`${API_URL}/expense`, expense);
  }
}
