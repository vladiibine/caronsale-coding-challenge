import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { AuthenticationPartialState } from './authentication.reducer';
import {
  LoadAuthentication,
  AuthenticationLoaded,
  AuthenticationLoadError,
  AuthenticationActionTypes
} from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  @Effect() loadAuthentication$ = this.dataPersistence.fetch(
    AuthenticationActionTypes.LoadAuthentication,
    {
      run: (action: LoadAuthentication, state: AuthenticationPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new AuthenticationLoaded([]);
      },

      onError: (action: LoadAuthentication, error) => {
        console.error('Error', error);
        return new AuthenticationLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AuthenticationPartialState>
  ) {}
}
