import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import {
  AuthenticationFacade,
  AuthenticationModule,
  AuthorizationGuard,
  HttpConfigInterceptor
} from '@caronsale/authentication';
import * as fromConsts from '@caronsale/authentication';
import { BuyerOverviewComponent } from './buyer-overview/buyer-overview.component';

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
    CommonModule,
    HttpClientModule,
    AuthenticationModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [BuyerOverviewComponent],
  exports: [BuyerOverviewComponent],
  providers: [
    AuthenticationFacade,
    {
      provide: 'buyerOnlyGuard',
      useFactory: createBuyerOnlyGuard,
      deps: [AuthenticationFacade, Router]
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class BuyerModule {}
