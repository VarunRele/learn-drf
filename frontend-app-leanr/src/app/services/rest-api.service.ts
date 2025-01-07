import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUserSchema, token } from '../types/createUser';
import { log, logs } from '../types/log';
import { LoggedInService } from './logged-in.service';
import { user } from '../types/user';
import { Observable } from 'rxjs';
import { vehicle_info, vehicle_info_paginated } from '../types/vehicle_info';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private url = 'http://127.0.0.1:8000'

  constructor(private request: HttpClient, private loggedIn: LoggedInService) { }

  createUser(user: createUserSchema) {
    return this.request.post(`${this.url}/auth/users/`, user)
  }

  loginUser(user: any) {
    this.loggedIn.setLoggedIn(true)
    return this.request.post<token>("http://127.0.0.1:8000/auth/jwt/create/", user)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token')
  }

  getAllLogs() {
    return this.request.get<logs>(`${this.url}/log/`)
  }
  
  getALog(id: number) {
    return this.request.get<log>(`${this.url}/log/${id}`)
  }

  getAuthToken() {
    return localStorage.getItem('access_token')
  }

  logout() {
    this.loggedIn.setLoggedIn(false)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  deleteLog(url: string) {
    return this.request.delete(url)
  }

  getCurrentUser(): Observable<user> {
    return this.request.get<user>(`${this.url}/auth/users/me/`)
  }

  getAllVehicles(): Observable<vehicle_info_paginated> {
    return this.request.get<vehicle_info_paginated>(`${this.url}/vehicle/`)
  }

  createLog(logObj: any) {
    return this.request.post<log>(`${this.url}/log/`, logObj)
  }
}
