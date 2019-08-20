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
import { DealershipOverviewComponent } from '@caronsale/ui';

export function createDealershipOnlyGuard(
  authFacade: AuthenticationFacade,
  router: Router
) {
  return new AuthorizationGuard(
    [fromConsts.userPrivileges.dealership],
    authFacade,
    router
  );
}

export const ROUTES: Routes = [
  {
    canActivate: ['dealershipOnlyGuard'],
    component: DealershipOverviewComponent,
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
  declarations: [DealershipOverviewComponent],
  exports: [DealershipOverviewComponent],
  providers: [
    AuthenticationFacade,
    {
      provide: 'dealershipOnlyGuard',
      useFactory: createDealershipOnlyGuard,
      deps: [AuthenticationFacade, Router]
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class DealershipModule {}
