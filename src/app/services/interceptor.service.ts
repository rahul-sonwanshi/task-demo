
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }
  handleError(error: HttpErrorResponse){
    console.log(error);
  
    if(error.status === 404) {
      // return throwError(error.status);
      return throwError(new NotFoundError(error));
    }
    else if(error.status === 400) {
      return throwError(new BadInput());
    }
    console.log("Unexpected Error has occured.");
    return throwError(new AppError(error));
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>>{
    return next.handle(req)
    .pipe(
    retry(2),
    catchError(this.handleError)
    )
  };
}
