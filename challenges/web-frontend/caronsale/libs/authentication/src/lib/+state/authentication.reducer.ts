import { Action, createReducer, on } from '@ngrx/store';

// import * as fromConsts from '../authentication.consts';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationResultI } from './authentication.models';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

export interface AuthenticationState extends AuthenticationResultI {
  error?: null | string; // last none error (if any)
}

export interface AuthenticationPartialState {
  readonly [AUTHENTICATION_FEATURE_KEY]: AuthenticationState;
}

export const ANONYMOUS_USER: AuthenticationState = {
  authenticated: false,
  privileges: '',
  token: '',
  type: null,
  userId: ''
};

export const initialState: AuthenticationState = ANONYMOUS_USER;

const authenticationReducer = createReducer(
  initialState,
  on(
    AuthenticationActions.sendAuthenticationSuccess,
    (state, { authentication }) => ({
      ...state,
      ...authentication
    })
  ),
  on(AuthenticationActions.resetAuthentication, state => ({
    ...state,
    ...initialState
  }))
);

export function reducer(
  state: undefined | AuthenticationState,
  action: Action
) {
  return authenticationReducer(state, action);
}
