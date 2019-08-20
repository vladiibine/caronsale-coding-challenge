import { createAction, props } from '@ngrx/store';
import { AuthenticationResult, LoginData } from './authentication.models';

export const sendAuthentication = createAction(
  '[Authentication] Send Authentication',
  props<{ loginData: LoginData; navTargets: Record<string, string> }>()
);
export const sendAuthenticationSuccess = createAction(
  '[Authentication] Send Authentication Success',
  props<{
    authentication: AuthenticationResult;
    navTargets: Record<string, string>;
  }>()
);
export const sendAuthenticationFailure = createAction(
  '[Authentication] Send Authentication Failure',
  props<{ error: any }>()
);

export const resetAuthentication = createAction(
  '[Authentication] Reset Authentication'
);
export const resetAuthenticationSuccess = createAction(
  '[Authentication] Reset Authentication Success'
);
