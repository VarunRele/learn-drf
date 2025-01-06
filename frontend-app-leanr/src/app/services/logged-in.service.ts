import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  private loggedIn: boolean = false
  setLoggedIn(value: boolean) {
    this.loggedIn = value
  }
  getLoggedInStatus(): boolean {
    return this.loggedIn
  }
}
