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

// const { selectAll, selectEntities } = authenticationAdapter.getSelectors();

// export const getAuthenticationLoaded = createSelector(
//   getAuthenticationState,
//   (state: AuthenticationState) => state.loaded
// );

// export const getAuthenticationError = createSelector(
//   getAuthenticationState,
//   (state: AuthenticationState) => state.error
// );

// export const getAllAuthentication = createSelector(
//   getAuthenticationState,
//   (state: AuthenticationState) => selectAll(state)
// );

// export const getAuthenticationEntities = createSelector(
//   getAuthenticationState,
//   (state: AuthenticationState) => selectEntities(state)
// );

// export const getSelectedId = createSelector(
//   getAuthenticationState,
//   (state: AuthenticationState) => state.selectedId
// );

// export const getSelected = createSelector(
//   getAuthenticationEntities,
//   getSelectedId,
//   (entities, selectedId) => selectedId && entities[selectedId]
// );
