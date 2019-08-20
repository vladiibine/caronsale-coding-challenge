import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AuthenticationActions from './authentication.actions';
import { LoginData } from './authentication.models';
import * as fromAuthentication from './authentication.reducer';
import * as AuthenticationSelectors from './authentication.selectors';

@Injectable()
export class AuthenticationFacade {
  // authenticationState$ = this.store.pipe(
  //   select(AuthenticationSelectors.getAuthenticated)
  // );
  isAuthenticated$ = this.store.pipe(
    select(AuthenticationSelectors.isAuthenticated)
  );
  authenticationState$ = this.store.pipe(
    select(AuthenticationSelectors.getAuthenticationState)
  );
  constructor(
    private store: Store<fromAuthentication.AuthenticationPartialState>
  ) {}

  sendAuthentication(
    { email, password }: LoginData,
    navTargets: Record<string, string>
  ): void {
    this.store.dispatch(
      AuthenticationActions.sendAuthentication({
        loginData: { email, password },
        navTargets
      })
    );
  }

  logOut() {
    this.store.dispatch(AuthenticationActions.resetAuthentication());
  }
}
