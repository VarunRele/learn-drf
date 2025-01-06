import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { log } from '../../types/log';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-view',
  imports: [],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.css'
})
export class DetailViewComponent implements OnInit{
  constructor(
    private routerInput: ActivatedRoute,
    private api: RestApiService,
    private routerOut: Router
    ) {}
  id!: number
  log!: log

  ngOnInit(): void {
    this.routerInput.params.subscribe(params => {
      this.id = +params['id']
    })
    try{
      this.api.getALog(this.id).subscribe({
        next: data => {
          this.log = data
          console.log(this.log)
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.routerOut.navigate(['/not-found'])
          }
        }
      })
    } catch(err) {
      console.log(err)
    }
  }
}
