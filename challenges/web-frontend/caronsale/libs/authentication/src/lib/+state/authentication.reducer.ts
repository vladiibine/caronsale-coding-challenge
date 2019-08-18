import {
  AuthenticationAction,
  AuthenticationActionTypes
} from './authentication.actions';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

/**
 * Interface for the 'Authentication' data used in
 *  - AuthenticationState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface AuthenticationState {
  list: Entity[]; // list of Authentication; analogous to a sql normalized table
  selectedId?: string | number; // which Authentication record has been selected
  loaded: boolean; // has the Authentication list been loaded
  error?: any; // last none error (if any)
}

export interface AuthenticationPartialState {
  readonly [AUTHENTICATION_FEATURE_KEY]: AuthenticationState;
}

export const initialState: AuthenticationState = {
  list: [],
  loaded: false
};

export function reducer(
  state: AuthenticationState = initialState,
  action: AuthenticationAction
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.AuthenticationLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
