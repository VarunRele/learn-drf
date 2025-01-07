import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../services/rest-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { token } from '../../types/createUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http: RestApiService, private router: Router) {}
  email = new FormControl("", [
    Validators.required,
  ])
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ])
  LoginForm = new FormGroup({
    email:this.email,
    password:this.password
  })
  login() {
    const value = this.LoginForm.value
    const user = {
      username: value.email,
      password: value.password
    }
    try {
      this.http.loginUser(user).subscribe({
        next: data => {
          localStorage.setItem('access_token', data.access)
          localStorage.setItem('refresh_token', data.refresh)
          this.router.navigate(['/log'])
        },
        error: (err: HttpErrorResponse) => console.log(err.error)
      })
    } catch (err) {
      console.log(err)
    }
    // console.log(this.LoginForm.value)
  }
  reset() {
    this.LoginForm.reset()
  }
}
