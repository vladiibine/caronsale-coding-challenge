import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { SalesmanAuctionsView } from '@caronsale/auctions';
import { Observable, Subject, of } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { IMAGE_PLACEHOLDER_URL } from '../common';

@Component({
  selector: 'caronsale-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.styl']
})
export class AuctionCardComponent implements OnInit, OnDestroy {
  imagePlaceholder = IMAGE_PLACEHOLDER_URL;
  private ngUnsubscribe = new Subject();

  public cols: Observable<number | undefined> = of(1);
  public gridColsStart = 0;

  @Input() auction!: SalesmanAuctionsView;
  @Input() auctions!: SalesmanAuctionsView[];

  constructor(private mediaObserver: MediaObserver) {}

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
