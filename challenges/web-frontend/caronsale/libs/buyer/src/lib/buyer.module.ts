import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import {
  AuctionsService,
  SalesmanAuctionsFacade,
  effects,
  reducer
} from '@caronsale/auctions';
import {
  AuthenticationFacade,
  AuthenticationModule,
  AuthorizationGuard,
  HttpConfigInterceptor
} from '@caronsale/authentication';
import * as fromConsts from '@caronsale/authentication';
import { BuyerOverviewComponent } from '@caronsale/ui';
import { UiModule } from '@caronsale/ui';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

export function createBuyerOnlyGuard(
  authFacade: AuthenticationFacade,
  router: Router
) {
  return new AuthorizationGuard(
    [fromConsts.userPrivileges.salesman, fromConsts.userPrivileges.buyer],
    authFacade,
    router
  );
}

export const ROUTES: Routes = [
  {
    canActivate: ['buyerOnlyGuard'],
    component: BuyerOverviewComponent,
    path: ''
  }
];

@NgModule({
  imports: [
    UiModule,
    CommonModule,
    HttpClientModule,
    AuthenticationModule,
    StoreModule.forFeature('salesmanAuctions', reducer),
    EffectsModule.forFeature(effects),
    RouterModule.forChild(ROUTES)
  ],
  // declarations: [ImgFallbackModule],
  exports: [],
  providers: [
    AuthenticationFacade,
    SalesmanAuctionsFacade,
    AuctionsService,
    {
      provide: 'buyerOnlyGuard',
      useFactory: createBuyerOnlyGuard,
      deps: [AuthenticationFacade, Router]
    },
    // {
    //   provide: ErrorHandler,
    //   useClass: AuthErrorHandler
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ]
})
export class BuyerModule {}
