import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { Router } from '@angular/router';
import { user } from '../../types/user';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { vehicle_info } from '../../types/vehicle_info';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-create-view',
  imports: [ReactiveFormsModule],
  templateUrl: './create-view.component.html',
  styleUrl: './create-view.component.css'
})
export class CreateViewComponent implements OnInit{
  constructor(private api: RestApiService, private router: Router) {}
  user!: user
  vehicles!: vehicle_info[]
  fuel_price = new FormControl(0, [
    Validators.required,
    Validators.min(0)
  ])

  quantity = new FormControl(0, [
    Validators.required,
    Validators.min(0)
  ])

  fuel_type = new FormControl("Petrol", [
    Validators.required
  ])

  km = new FormControl(0, [
    Validators.required,
    Validators.min(0)
  ])

  location = new FormControl("", [])

  vehicle = new FormControl(null, [])

  createGroup = new FormGroup({
    price: this.fuel_price,
    quantity: this.quantity,
    fuel_type: this.fuel_type,
    odo: this.km,
    location: this.location,
    vehicle: this.vehicle
  })

  ngOnInit(): void {
    this.api.getCurrentUser().subscribe({
      next: data => {
        this.user = data
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    }) 

    this.api.getAllVehicles().subscribe({
      next: data => {
        this.vehicles = data.results
      }
    })
  }
  
  create() {
    const value = this.createGroup.value
    if (value.vehicle === null){
      delete value.vehicle
    }
    if (value.location === null) {
      delete value.location
    }
    this.api.createLog(value).subscribe({
      next: data => {
        alert(`Value of log id ${data.id} create successfully.`)
        this.router.navigate(['/log'])
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 406) {
          alert(err.error.error)
        } else if (err.status === 400) {
          alert(JSON.stringify(err.error))
        } else {
          console.log(err)
        }
      }
    })
  }

  reset() {
    this.createGroup.reset()
  }
}
