import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { MatDialogRef } from '@angular/material/dialog';
import * as AuthenticationActions from './authentication.actions';
import { LoginData } from './authentication.models';
import * as fromAuthentication from './authentication.reducer';
// import * as AuthenticationSelectors from './authentication.selectors';

@Injectable()
export class AuthenticationFacade {
  // loaded$ = this.store.pipe(
  //   select(AuthenticationSelectors.getAuthenticationLoaded)
  // );
  // allAuthentication$ = this.store.pipe(
  //   select(AuthenticationSelectors.getAllAuthentication)
  // );
  // selectedAuthentication$ = this.store.pipe(
  //   select(AuthenticationSelectors.getSelected)
  // );

  constructor(
    private store: Store<fromAuthentication.AuthenticationPartialState>
  ) {}

  // loadAll() {
  //   this.store.dispatch(AuthenticationActions.loadAuthentication());
  // }

  sendAuthentication({ email, password }: LoginData): void {
    this.store.dispatch(
      AuthenticationActions.sendAuthentication({
        loginData: { email, password }
      })
    );
  }
}
