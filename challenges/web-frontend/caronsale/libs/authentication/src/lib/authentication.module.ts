import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticationEffects } from './+state/authentication.effects';
import { AuthenticationFacade } from './+state/authentication.facade';
import * as fromAuthentication from './+state/authentication.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAuthentication.AUTHENTICATION_FEATURE_KEY,
      fromAuthentication.reducer
    ),
    EffectsModule.forFeature([AuthenticationEffects])
  ],
  providers: [AuthenticationFacade]
})
export class AuthenticationModule {}
