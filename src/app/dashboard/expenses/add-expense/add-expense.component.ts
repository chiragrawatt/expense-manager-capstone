import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEvent } from 'src/shared/models/interfaces/Event';
import { IExpense } from 'src/shared/models/interfaces/Expense';
import { IExpenseCategory } from 'src/shared/models/interfaces/ExpenseCategory';
import { EExpenseStatus } from 'src/shared/models/enums/ExpenseStatus';
import { CategoryService } from 'src/shared/services/category.service';
import { EventService } from 'src/shared/services/event.service';
import { ExpenseService } from 'src/shared/services/expense.service';
import { UserService } from 'src/shared/services/user.service';
import { ENotificationType } from 'src/shared/models/enums/NotificationType';
import { INotification } from 'src/shared/models/interfaces/Notification';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup = this.fb.group({});

  events : IEvent[] = []
  categories : IExpenseCategory[] = [];

  imgSrc : any = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private expenseService: ExpenseService, private eventService: EventService, private categoryService: CategoryService, private router: Router, private userService: UserService) { }

  onSubmit(): void {
    let formData : IExpense = this.expenseForm.getRawValue();

    formData.receipt = this.imgSrc;
    formData.status = EExpenseStatus.PENDING;

    console.log(formData);

    this.expenseService.addExpense(formData).subscribe({
      next: res => {
        console.log(res);

        let notification : INotification = {
          navLink: "/dashboard/expenses/pending",
          isVisited: false,
          type: ENotificationType.NEUTRAL,
          message: `You have an expense request from ${this.authService.currentUser?.username} for event ${formData.event.title}` 
        }

        console.log(notification);
        
        this.userService.notifyUser(notification, formData.event.creator.id).subscribe({
          next: res => {
            console.log(res);
            this.router.navigateByUrl('/dashboard/expenses/view')
          },
          error: err => {
            console.log(err);
          }
        })

      },
      error: err => {
        console.log(err);
      }
    });
  }

  showForm() {
    console.log(this.expenseForm);
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required]],
      category: [null, [Validators.required]],
      date: ['', [Validators.required]],
      receipt: [''],
      description: ['', [Validators.required]],
      event: [null, [Validators.required]],
    });

    this.eventService.participatedEvents.subscribe({
      next: res => {
        this.events = res.filter(event => event.isActive == true);
        console.log(res);
      },  
      error: err => {
        console.log(err);
      }
    })

    this.categoryService.expenseCategories.subscribe({
      next: res => {
        this.categories = res;
      },
      error: err => {
        console.log(err);
      }
    })

    this.eventService.getParticipatedEvents();
    this.categoryService.getAllExpenseCategories();
  }

  convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  uploadImage = async (event: any) => {
    const file = event.target.files[0];
    const base64 = await this.convertBase64(file);
    this.imgSrc = base64;
  };
}
