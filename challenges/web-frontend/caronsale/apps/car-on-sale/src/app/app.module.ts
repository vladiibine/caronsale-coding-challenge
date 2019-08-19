import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  AuthenticationFacade,
  AuthenticationModule
} from '@caronsale/authentication';
import { BuyerModule } from '@caronsale/buyer';
import { UiModule } from '@caronsale/ui';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MainComponent],
  imports: [
    AppRoutingModule,
    BuyerModule,
    AuthenticationModule,
    UiModule,
    BrowserModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [AuthenticationFacade],
  bootstrap: [AppComponent],
  entryComponents: [MainComponent]
})
export class AppModule {}
