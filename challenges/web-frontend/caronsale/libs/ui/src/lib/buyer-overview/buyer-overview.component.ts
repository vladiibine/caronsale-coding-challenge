import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {
  SalesmanAuctionsFacade,
  SalesmanAuctionsView
} from '@caronsale/auctions';
import { Observable, Subject, interval, of, timer } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'caronsale-buyer-overview',
  templateUrl: './buyer-overview.component.html',
  styleUrls: ['./buyer-overview.component.styl']
})
export class BuyerOverviewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  public cols: Observable<number | undefined> = of(1);
  public gridColsStart = 0;

  loadAuctionsInterval = timer(0, 20000);

  constructor(
    private salesmanAuctionsFacade: SalesmanAuctionsFacade,
    private mediaObserver: MediaObserver
  ) {
    this.loadAuctionsInterval
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(() => this.salesmanAuctionsFacade.loadAll())
      )
      .subscribe();
  }
  timeLeft$: any;
  auctions$: Observable<SalesmanAuctionsView[]> = this.salesmanAuctionsFacade
    .salesmanAuctionsView$;

  ngOnInit() {
    // https://brianflove.com/2017/05/03/responsive-angular/
    const grid = new Map([
      ['xs', 1],
      ['sm', 2],
      ['md', 3],
      ['lg', 4],
      ['xl', 5]
    ]);
    this.cols = this.mediaObserver.asObservable().pipe(
      takeUntil(this.ngUnsubscribe),
      map(change => {
        return grid.get(change[0].mqAlias);
      }),
      startWith(this.gridColsStart)
    );
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
