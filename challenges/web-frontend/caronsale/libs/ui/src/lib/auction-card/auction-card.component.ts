import { Component, Input, OnInit } from '@angular/core';
import { SalesmanAuctionsView } from '@caronsale/auctions';

@Component({
  selector: 'caronsale-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.styl']
})
export class AuctionCardComponent implements OnInit {
  @Input() auctions!: SalesmanAuctionsView[];
  constructor() {}

  ngOnInit() {}
}
