import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConsts from '../authentication.consts';
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

export const getAuthenticated = createSelector(
  getAuthenticationState,
  (state: AuthenticationState) => state
);
