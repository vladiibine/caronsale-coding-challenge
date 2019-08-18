import { Action, createReducer, on } from '@ngrx/store';

import * as AuthenticationActions from './authentication.actions';
import { AuthenticationEntity } from './authentication.models';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

export interface AuthenticationState {
  authenticated: boolean; // has the Authentication list been loaded
  error?: null | string; // last none error (if any)
}

export interface AuthenticationPartialState {
  readonly [AUTHENTICATION_FEATURE_KEY]: AuthenticationState;
}

export const initialState: AuthenticationState = {
  // set initial required properties
  authenticated: false
};

const authenticationReducer = createReducer(
  initialState,
  on(
    AuthenticationActions.sendAuthenticationSuccess,
    (state, { authentication }) => ({
      ...state,
      ...authentication
    })
  )
);

export function reducer(
  state: undefined | AuthenticationState,
  action: Action
) {
  return authenticationReducer(state, action);
}
