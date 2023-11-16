import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IExpenseCategory } from '../models/interfaces/ExpenseCategory';
import { API_URL } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  expenseCategories : BehaviorSubject<IExpenseCategory[]> = new BehaviorSubject<IExpenseCategory[]>([]);

  constructor(private http: HttpClient) { }

  getAllExpenseCategories() : void {
    this.http.get<IExpenseCategory[]>(`${API_URL}/expense/categories`).subscribe({
      next: res => {
        this.expenseCategories.next(res);
      },
      error: err => {
        this.expenseCategories.error(err);
      }
    })
  }
}
