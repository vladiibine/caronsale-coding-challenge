import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationFacade } from './authentication.facade';
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
                authentication,
                navTargets: action.navTargets
              })
            ];
          })
        );
      }
    })
  );

  sendAuthenticationSuccess$ = createEffect(() =>
    this.dataPersistence.fetch(
      AuthenticationActions.sendAuthenticationSuccess,
      {
        onError: (
          action: ReturnType<typeof AuthenticationActions.sendAuthenticationSuccess>,
          error
        ) => {
          console.error('Error', error);
          return null
        },
        run: (
          action: ReturnType<
            typeof AuthenticationActions.sendAuthenticationSuccess
          >,
          state: AuthenticationPartialState
        ) => {
          return this.authenticationFacade.authenticationState$.pipe(
            take(1),
            map(authentication => action.navTargets[authentication.privileges]),
            map(link =>
              this.router.navigate([link])
            ),
            catchError(e=>of(e)),
            switchMap(() => {
              return [];
            })
          );
        }
      }
    )
  );

  resetAuthentication$ = createEffect(() =>
    this.dataPersistence.fetch(AuthenticationActions.resetAuthentication, {
      onError: (
        action: ReturnType<typeof AuthenticationActions.resetAuthentication>,
        error
      ) => {
        console.error('Error', error);
        return null
      },
      run: (
        action: ReturnType<typeof AuthenticationActions.resetAuthentication>,
        state: AuthenticationPartialState
      ) => {
        return of(['/']).pipe(
          map(link => this.router.navigate(link)),
          catchError(e=>of(e)),
          switchMap(() => {
            return [];
          })
        );
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AuthenticationPartialState>,
    private authenticationService: AuthenticationService,
    private authenticationFacade: AuthenticationFacade,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
}
