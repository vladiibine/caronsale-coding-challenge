import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha512 } from 'js-sha512';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {
  AuthenticationResult,
  LoginData
} from './+state/authentication.models';

export const ANONYMOUS_USER: AuthenticationResult = {
  authenticated: false,
  privileges: 'string',
  token: 'string',
  type: '0', // TODO: is '0' correct?
  userId: 'string'
};
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const baseURL = 'https://caronsale-backend-service-dev.herokuapp.com/api/v1';
const authenticationUrl = baseURL + '/authentication/';
// const baseURL = 'https://caronsale-backend-service-dev.example.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private hashPasswordWithCycles(
    plainTextPassword: string,
    cycles: number
  ): string {
    let hash = `${plainTextPassword}`;

    for (let i = 0; i < cycles; i++) {
      hash = sha512(hash);
    }

    return hash;
  }

  constructor(private http: HttpClient) {}

  login({ email, password }: LoginData): Observable<AuthenticationResult> {
    const passwordHash = this.hashPasswordWithCycles(password, 5);
    return this.http
      .put<AuthenticationResult>(
        authenticationUrl + email,
        {
          password: passwordHash
        },
        httpOptions
      )
      .pipe(
        shareReplay()
        // tap(console.log)
      );
  }

  logout(): Observable<AuthenticationResult> {
    return of(ANONYMOUS_USER);
  }
}
