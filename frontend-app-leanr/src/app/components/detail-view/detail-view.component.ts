import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { log } from '../../types/log';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-view',
  imports: [NgIf],
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
      this.loadLog(this.id)
    })
  }

  loadLog(id: number): void {
    try{
      this.api.getALog(id).subscribe({
        next: data => {
          this.log = data
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.routerOut.navigate(['/not-found'])
          }
          if (err.status === 403) {
            alert("Not allowed to view others logs")
            this.routerOut.navigate(['/log'])
          }
        }
      })
    } catch(err) {
      console.log(err)
    }
  }

  onClick(url: string) {
    this.api.deleteLog(url).subscribe({
      next: data => {
        this.routerOut.navigate(['/log'])
      },
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }
}
