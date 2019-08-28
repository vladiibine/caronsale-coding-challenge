import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { filter } from 'rxjs/operators';
import * as SalesmanAuctionsActions from './salesman-auctions.actions';
import * as fromSalesmanAuctions from './salesman-auctions.reducer';
import * as SalesmanAuctionsSelectors from './salesman-auctions.selectors';

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
  salesmanAuctionsList$ = this.store.pipe(
    select(SalesmanAuctionsSelectors.getSalesmanAuctionsList),
    filter((e: any[]) => !!e && e.length > 0)
  );
  salesmanAuctionsView$ = this.store.pipe(
    select(SalesmanAuctionsSelectors.getSalesmanAuctionView),
    filter((e: any[]) => !!e && e.length > 0)
  );

  constructor(
    private store: Store<fromSalesmanAuctions.SalesmanAuctionsPartialState>
  ) {}

  loadAll() {
    this.store.dispatch(SalesmanAuctionsActions.loadSalesmanAuctions());
  }
}
