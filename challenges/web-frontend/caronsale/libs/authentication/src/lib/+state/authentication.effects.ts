import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationPartialState } from './authentication.reducer';

@Injectable()
export class AuthenticationEffects {
  sendAuthentication$ = createEffect(() =>
    this.dataPersistence.fetch(AuthenticationActions.sendAuthentication, {
      onError: (
        action: ReturnType<typeof AuthenticationActions.sendAuthentication>,
        error
      ) => {
        console.error('Error', error);
        this._snackBar.open('Login failed', 'Ok', {
          duration: 3000
        });
        return AuthenticationActions.sendAuthenticationFailure({ error });
      },
      run: (
        action: ReturnType<typeof AuthenticationActions.sendAuthentication>,
        state: AuthenticationPartialState
      ) => {
        return this.authenticationService.login(action.loginData).pipe(
          take(1),
          // tap(e => console.log('Result sendAuthentication', e)),
          tap(e =>
            this._snackBar.open('Welcome back ' + e.userId, 'Ok', {
              duration: 3000
            })
          ),
          switchMap(authentication => {
            return [
              AuthenticationActions.sendAuthenticationSuccess({
                authentication
              })
            ];
          })
        );
      }
    })
  );
  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AuthenticationPartialState>,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {}
}
