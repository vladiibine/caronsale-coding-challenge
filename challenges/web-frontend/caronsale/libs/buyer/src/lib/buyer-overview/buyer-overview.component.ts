import { Component, OnInit } from '@angular/core';
import { SalesmanAuctionsFacade } from '@caronsale/auctions';

@Component({
  selector: 'caronsale-buyer-overview',
  templateUrl: './buyer-overview.component.html',
  styleUrls: ['./buyer-overview.component.styl']
})
export class BuyerOverviewComponent implements OnInit {
  constructor(private salesmanAuctionsFacade: SalesmanAuctionsFacade) {}

  ngOnInit() {
    this.salesmanAuctionsFacade.loadAll();
  }
}
