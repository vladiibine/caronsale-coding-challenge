import { Component, OnInit } from '@angular/core';
import { AuctionsService } from '@caronsale/auctions';

@Component({
  selector: 'caronsale-buyer-overview',
  templateUrl: './buyer-overview.component.html',
  styleUrls: ['./buyer-overview.component.styl']
})
export class BuyerOverviewComponent implements OnInit {
  constructor(private auctionsService: AuctionsService) {}

  ngOnInit() {
    this.auctionsService.getSalesmanAuction().subscribe(e => console.log(e));
  }
}
