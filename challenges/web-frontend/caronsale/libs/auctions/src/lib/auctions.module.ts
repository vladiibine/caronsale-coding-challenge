import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSalesmanAuctions from './+state/salesman-auctions.reducer';
import { SalesmanAuctionsEffects } from './+state/salesman-auctions.effects';
import { SalesmanAuctionsFacade } from './+state/salesman-auctions.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSalesmanAuctions.SALESMANAUCTIONS_FEATURE_KEY,
      fromSalesmanAuctions.reducer
    ),
    EffectsModule.forFeature([SalesmanAuctionsEffects])
  ],
  providers: [SalesmanAuctionsFacade]
})
export class AuctionsModule {}
