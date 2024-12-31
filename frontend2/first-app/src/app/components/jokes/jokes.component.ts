import { Component, OnInit } from '@angular/core';
import { JokesService } from '../../services/jokes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-jokes',
  imports: [],
  templateUrl: './jokes.component.html',
  styleUrl: './jokes.component.css'
})
export class JokesComponent implements OnInit{
  jokes = "Loading"
  constructor(private jokeApi: JokesService) {}
  ngOnInit() {
    this.getJoke()
  }
  getJoke() {
    this.jokeApi.getJoke()
    .subscribe({
      next: data => this.jokes = JSON.stringify(data),
      error: (err: HttpErrorResponse) => console.log("Error", err)
    })
  }
}
