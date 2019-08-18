import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AuthenticationPartialState } from './authentication.reducer';
import { authenticationQuery } from './authentication.selectors';
import { LoadAuthentication } from './authentication.actions';

@Injectable()
export class AuthenticationFacade {
  loaded$ = this.store.pipe(select(authenticationQuery.getLoaded));
  allAuthentication$ = this.store.pipe(
    select(authenticationQuery.getAllAuthentication)
  );
  selectedAuthentication$ = this.store.pipe(
    select(authenticationQuery.getSelectedAuthentication)
  );

  constructor(private store: Store<AuthenticationPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadAuthentication());
  }
}
