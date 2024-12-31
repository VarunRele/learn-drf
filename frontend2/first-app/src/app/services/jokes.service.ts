import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  constructor(private http: HttpClient) { }

  getJoke() {
    return this.http.get("https://official-joke-api.appspot.com/random_joke")
  }
}
