import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha512 } from 'js-sha512';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {
  AuthenticationResultI,
  LoginData
} from './+state/authentication.models';

import { ANONYMOUS_USER } from './+state/authentication.reducer';
import * as fromConsts from './authentication.consts';
export const authenticationUrl = fromConsts.baseURL + '/authentication/';

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

  login({ email, password }: LoginData): Observable<AuthenticationResultI> {
    const passwordHash = this.hashPasswordWithCycles(password, 5);
    return this.http
      .put<AuthenticationResultI>(
        authenticationUrl + email,
        {
          password: passwordHash
        },
        fromConsts.httpOptions
      )
      .pipe(
        shareReplay()
        // tap(console.log)
      );
  }

  logout(): Observable<AuthenticationResultI> {
    return of(ANONYMOUS_USER);
  }
}
