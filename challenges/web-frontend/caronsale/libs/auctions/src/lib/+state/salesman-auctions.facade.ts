import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromSalesmanAuctions from './salesman-auctions.reducer';
import * as SalesmanAuctionsSelectors from './salesman-auctions.selectors';
import * as SalesmanAuctionsActions from './salesman-auctions.actions';

@Injectable()
export class SalesmanAuctionsFacade {
  loaded$ = this.store.pipe(
    select(SalesmanAuctionsSelectors.getSalesmanAuctionsLoaded)
  );
  allSalesmanAuctions$ = this.store.pipe(
    select(SalesmanAuctionsSelectors.getAllSalesmanAuctions)
  );
  selectedSalesmanAuctions$ = this.store.pipe(
    select(SalesmanAuctionsSelectors.getSelected)
  );

  constructor(
    private store: Store<fromSalesmanAuctions.SalesmanAuctionsPartialState>
  ) {}

  loadAll() {
    this.store.dispatch(SalesmanAuctionsActions.loadSalesmanAuctions());
  }
}
