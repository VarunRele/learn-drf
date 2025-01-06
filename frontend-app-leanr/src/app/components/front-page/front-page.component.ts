import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { log } from '../../types/log';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-front-page',
  imports: [RouterLink],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent implements OnInit {
  constructor (private api: RestApiService) {}
  data!: log[]
  ngOnInit(): void {
    try {
      this.api.getAllLogs().subscribe({
        next: data => {
          if (data.results)
          this.data = data.results
        },
        error: (err: HttpErrorResponse) => console.log(err, 'fornt')
      }) 
    } catch(err) {
      console.log(err)
    }
  }
}
