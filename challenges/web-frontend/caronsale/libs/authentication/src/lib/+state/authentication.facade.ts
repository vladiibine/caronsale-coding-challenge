import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AuthenticationActions from './authentication.actions';
import { LoginData } from './authentication.models';
import * as fromAuthentication from './authentication.reducer';
import * as AuthenticationSelectors from './authentication.selectors';

@Injectable()
export class AuthenticationFacade {
  authenticated$ = this.store.pipe(
    select(AuthenticationSelectors.getAuthenticated)
  );
  getAuthenticationState$ = this.store.pipe(
    select(AuthenticationSelectors.getAuthenticationState)
  );
  constructor(
    private store: Store<fromAuthentication.AuthenticationPartialState>
  ) {}

  sendAuthentication({ email, password }: LoginData, navTarget: string): void {
    this.store.dispatch(
      AuthenticationActions.sendAuthentication({
        loginData: { email, password },
        navTarget
      })
    );
  }
}
