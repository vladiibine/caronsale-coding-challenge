import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AUTHENTICATION_FEATURE_KEY,
  AuthenticationPartialState,
  AuthenticationState
} from './authentication.reducer';

// Lookup the 'Authentication' feature state managed by NgRx
export const getAuthenticationState = createFeatureSelector<
  AuthenticationPartialState,
  AuthenticationState
>(AUTHENTICATION_FEATURE_KEY);

export const isAuthenticated = createSelector(
  getAuthenticationState,
  (state: AuthenticationState) => state.authenticated
);
