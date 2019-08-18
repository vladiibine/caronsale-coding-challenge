import { Action } from '@ngrx/store';
import { Entity } from './authentication.reducer';

export enum AuthenticationActionTypes {
  LoadAuthentication = '[Authentication] Load Authentication',
  AuthenticationLoaded = '[Authentication] Authentication Loaded',
  AuthenticationLoadError = '[Authentication] Authentication Load Error'
}

export class LoadAuthentication implements Action {
  readonly type = AuthenticationActionTypes.LoadAuthentication;
}

export class AuthenticationLoadError implements Action {
  readonly type = AuthenticationActionTypes.AuthenticationLoadError;
  constructor(public payload: any) {}
}

export class AuthenticationLoaded implements Action {
  readonly type = AuthenticationActionTypes.AuthenticationLoaded;
  constructor(public payload: Entity[]) {}
}

export type AuthenticationAction =
  | LoadAuthentication
  | AuthenticationLoaded
  | AuthenticationLoadError;

export const fromAuthenticationActions = {
  LoadAuthentication,
  AuthenticationLoaded,
  AuthenticationLoadError
};
