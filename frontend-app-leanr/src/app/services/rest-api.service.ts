import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUserSchema, token } from '../types/createUser';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private request: HttpClient) { }

  createUser(user: createUserSchema) {
    return this.request.post("http://127.0.0.1:8000/auth/users/", user)
  }

  loginUser(user: any) {
    return this.request.post<token>("http://127.0.0.1:8000/auth/jwt/create/", user)
  }
}
