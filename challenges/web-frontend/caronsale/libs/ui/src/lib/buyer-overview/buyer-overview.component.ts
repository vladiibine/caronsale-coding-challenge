import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  SalesmanAuctionsFacade,
  SalesmanAuctionsView
} from '@caronsale/auctions';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'caronsale-buyer-overview',
  templateUrl: './buyer-overview.component.html',
  styleUrls: ['./buyer-overview.component.styl']
})
export class BuyerOverviewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  loadAuctionsInterval = interval(20000);
  constructor(private salesmanAuctionsFacade: SalesmanAuctionsFacade) {
    this.loadAuctionsInterval
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.salesmanAuctionsFacade.loadAll());
    this.salesmanAuctionsFacade.loadAll();
  }
  auctions$: Observable<
    SalesmanAuctionsView[]
  > = this.salesmanAuctionsFacade.salesmanAuctionsView$.pipe(tap(console.log));
  ngOnInit() {}
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
