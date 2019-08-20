import { Component, OnInit } from '@angular/core';
import {
  SalesmanAuctionsFacade,
  SalesmanAuctionsViewI
} from '@caronsale/auctions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'caronsale-buyer-overview',
  templateUrl: './buyer-overview.component.html',
  styleUrls: ['./buyer-overview.component.styl']
})
export class BuyerOverviewComponent implements OnInit {
  constructor(private salesmanAuctionsFacade: SalesmanAuctionsFacade) {
    this.salesmanAuctionsFacade.loadAll();
  }
  auctions$: Observable<
    SalesmanAuctionsViewI[]
  > = this.salesmanAuctionsFacade.salesmanAuctionsList$.pipe(tap(console.log));
  ngOnInit() {}
}
