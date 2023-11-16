import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { ILoginRequest } from 'src/shared/models/interfaces/payloads/LoginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{
  userForm : FormGroup = this.fb.group({});
  isLoading : boolean = true;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

    if(this.authService.authToken.length > 0) {
      this.authService.validateToken().subscribe({
        next: res => {
          this.authService.setCurrentUser(res);
          this.router.navigateByUrl('/dashboard');
        },
        error: err => {
          console.log(err);
        this.isLoading = false;
        }
      })
    } else {
      this.isLoading = false;
    }
  }

  onSubmit() : void {
    let userData: ILoginRequest = this.userForm.getRawValue();
    this.authService.signIn(userData).subscribe({
      next: res => {
        console.log(res);
        this.authService.setCurrentUser(res.user);
        this.authService.setAuthToken(res.token);
        this.router.navigateByUrl('/dashboard')
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
