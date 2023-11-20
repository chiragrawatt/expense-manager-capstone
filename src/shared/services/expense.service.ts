import { Injectable } from '@angular/core';
import { IExpense } from '../models/interfaces/Expense';
import { API_URL } from '../constants/api.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EExpenseStatus } from '../models/enums/ExpenseStatus';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expense : BehaviorSubject<IExpense | null> = new BehaviorSubject<IExpense | null>(null);
  createdExpenses : BehaviorSubject<IExpense[]> = new BehaviorSubject<IExpense[]>([]);
  pendingExpenses : BehaviorSubject<IExpense[]> = new BehaviorSubject<IExpense[]>([]);

  constructor(private http: HttpClient) { }

  getCreatedExpenses() : void {
    this.createdExpenses.next([]);
    this.http.get<IExpense[]>(`${API_URL}/expense`).subscribe({
      next: res => {
        this.createdExpenses.next(res);
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getExpensesForManagerWithStatus(status : EExpenseStatus) : void {
    this.pendingExpenses.next([]);
    this.http.get<IExpense[]>(`${API_URL}/expense/manager/${EExpenseStatus[status]}`).subscribe({
      next: res => {
        this.pendingExpenses.next(res);
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getExpenseById(expenseId: string) : void {
    this.expense.next(null);
    this.http.get<IExpense>(`${API_URL}/expense/${expenseId}`).subscribe({
      next: res => {
        this.expense.next(res);
      },
      error: err => {
        this.expense.error(err);
      }
    })
  }

  chageExpenseStatus(expenseId: string, status : EExpenseStatus) : Observable<IExpense> {
    return this.http.put<IExpense>(`${API_URL}/expense/status/${expenseId}`, status);
  }

  addExpense(expense: IExpense) : Observable<IExpense> {
    return this.http.post<IExpense>(`${API_URL}/expense`, expense);
  }

  deleteExpense(expenseId: string) {
    return this.http.delete<number>(`${API_URL}/expense/${expenseId}`)
  }
}
