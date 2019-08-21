import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { SalesmanAuctionsView } from '@caronsale/auctions';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMAGE_PLACEHOLDER_URL } from '../common';

@Component({
  selector: 'caronsale-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.styl']
})
export class AuctionCardComponent implements OnInit {
  imagePlaceholder = IMAGE_PLACEHOLDER_URL;

  @Input() auctions!: SalesmanAuctionsView[];
  public cols: Observable<number | undefined> = of(1);
  public gridColsStart = 0;

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
      map(change => {
        return grid.get(change[0].mqAlias);
      }),
      startWith(this.gridColsStart)
    );
  }
}
