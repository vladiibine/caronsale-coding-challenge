import { Action, createReducer, on } from '@ngrx/store';

import * as fromConsts from '../authentication.consts';
import * as AuthenticationActions from './authentication.actions';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

export interface AuthenticationState {
  authenticated: boolean;
  error?: null | string; // last none error (if any)
  privileges: null | string;
  token: null | string;
  type: null | '0' | '1' | '2' | '3' | '4';
  userId: null | string;
}

export interface AuthenticationPartialState {
  readonly [AUTHENTICATION_FEATURE_KEY]: AuthenticationState;
}

export const initialState: AuthenticationState = fromConsts.ANONYMOUS_USER;

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
