import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  AuthenticationModule,
  HttpConfigInterceptor
} from '@caronsale/authentication';
import { BuyerOverviewComponent } from './buyer-overview/buyer-overview.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, AuthenticationModule],
  declarations: [BuyerOverviewComponent],
  exports: [BuyerOverviewComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class BuyerModule {}
