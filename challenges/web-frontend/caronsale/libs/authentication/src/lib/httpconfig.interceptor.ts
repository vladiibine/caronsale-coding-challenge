import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthenticationFacade } from './+state/authentication.facade';
import { AuthenticationResult } from './+state/authentication.models';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private authenticationFacade: AuthenticationFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('INTERCEPT');
    return this.authenticationFacade.authenticationState$.pipe(
      take(1),
      map((e: AuthenticationResult) => {
        let headers: HttpHeaders = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        if (!!e && !!e.token && !!e.userId) {
          headers = new HttpHeaders({
            'Content-Type': 'application/json',
            authtoken: e.token!,
            userid: e.userId!
          });
        }
        return request.clone({
          headers: headers
        });
      }),
      switchMap(newRequest =>
        next
          .handle(newRequest)
          .pipe(catchError((error: HttpErrorResponse) => throwError(error)))
      )
    );
  }
}
