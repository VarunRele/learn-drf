import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { createUserSchema } from '../../types/createUser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router, private userApi: RestApiService) {}
  user?: createUserSchema
  email = new FormControl("", [
    Validators.required,
    Validators.email
  ])
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ])
  signupForm = new FormGroup({
    email:this.email,
    password:this.password
  })
  register() {
    console.log(this.signupForm.value)
    const value = this.signupForm.value
    this.user = {email: value.email, password:value.password, username: value.email}
    try {
      this.userApi.createUser(this.user).subscribe({
        next: data => console.log(data),
        error: (err: HttpErrorResponse) => console.log(err.error)
      })
      this.router.navigate(['/login'])
    } catch (err) {
      console.log(err)
    }
  }
  reset() {
    this.signupForm.reset()
  }
}
