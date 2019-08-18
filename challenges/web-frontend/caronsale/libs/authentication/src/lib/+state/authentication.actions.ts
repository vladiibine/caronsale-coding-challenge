import { MatDialogRef } from '@angular/material/dialog';
import { createAction, props } from '@ngrx/store';
import { AuthenticationResult, LoginData } from './authentication.models';

export const sendAuthentication = createAction(
  '[Authentication] Send Authentication',
  props<{ loginData: LoginData }>()
);

export const sendAuthenticationSuccess = createAction(
  '[Authentication] Send Authentication Success',
  props<{ authentication: AuthenticationResult }>()
);
export const sendAuthenticationSuccessTest = createAction(
  '[Authentication] Send Authentication Success Test',
  props<{ authentication: AuthenticationResult }>()
);
export const sendAuthenticationFailure = createAction(
  '[Authentication] Send Authentication Failure',
  props<{ error: any }>()
);
