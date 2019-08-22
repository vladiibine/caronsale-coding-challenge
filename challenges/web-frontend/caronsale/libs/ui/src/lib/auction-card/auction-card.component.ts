import { Component, Input, OnInit } from '@angular/core';
import { SalesmanAuctionsView } from '@caronsale/auctions';
import { IMAGE_PLACEHOLDER_URL } from '../common';

@Component({
  selector: 'caronsale-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.styl']
})
export class AuctionCardComponent implements OnInit {
  imagePlaceholder = IMAGE_PLACEHOLDER_URL;

  @Input() auction!: SalesmanAuctionsView;

  constructor() {}

  ngOnInit() {}
}
