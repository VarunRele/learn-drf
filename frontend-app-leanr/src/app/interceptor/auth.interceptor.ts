import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { RestApiService } from '../services/rest-api.service';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(RestApiService)
  const router = inject(Router)
  const newReq = req.clone({
    headers: req.headers.append("Authorization", `Bearer ${token.getAuthToken()}`),
  })
  return next(newReq).pipe(catchError((err: HttpErrorResponse) => {
    if (err.status === 401) {
      token.logout()
      router.navigate(['/login'])
    }
    return throwError(() => new HttpErrorResponse({
      error: err.error, 
      headers: err.headers, 
      status: err.status, 
      statusText: err.statusText, 
      url: err.url || undefined
    }))
  }))
};
