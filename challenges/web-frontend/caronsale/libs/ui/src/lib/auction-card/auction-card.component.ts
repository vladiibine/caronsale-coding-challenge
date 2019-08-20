import { Component, Input, OnInit } from '@angular/core';
import { SalesmanAuctionsViewI } from '@caronsale/auctions';

@Component({
  selector: 'caronsale-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.styl']
})
export class AuctionCardComponent implements OnInit {
  @Input() auctions!: SalesmanAuctionsViewI[];
  constructor() {}

  ngOnInit() {}
}
