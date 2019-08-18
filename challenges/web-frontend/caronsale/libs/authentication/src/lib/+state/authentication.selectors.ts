import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AUTHENTICATION_FEATURE_KEY,
  AuthenticationState
} from './authentication.reducer';

// Lookup the 'Authentication' feature state managed by NgRx
const getAuthenticationState = createFeatureSelector<AuthenticationState>(
  AUTHENTICATION_FEATURE_KEY
);

const getLoaded = createSelector(
  getAuthenticationState,
  (state: AuthenticationState) => state.loaded
);
const getError = createSelector(
  getAuthenticationState,
  (state: AuthenticationState) => state.error
);

const getAllAuthentication = createSelector(
  getAuthenticationState,
  getLoaded,
  (state: AuthenticationState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getAuthenticationState,
  (state: AuthenticationState) => state.selectedId
);
const getSelectedAuthentication = createSelector(
  getAllAuthentication,
  getSelectedId,
  (authentication, id) => {
    const result = authentication.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const authenticationQuery = {
  getLoaded,
  getError,
  getAllAuthentication,
  getSelectedAuthentication
};
