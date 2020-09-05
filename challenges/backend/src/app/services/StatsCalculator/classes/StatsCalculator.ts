import {injectable} from "inversify";

import {IStatsCalculator} from "../interface/IStatsCalculator";
import {IApiAuction} from "../../CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class StatsCalculator implements IStatsCalculator {
    getAverageNumberOfBids(auctions: [IApiAuction]): number {
        let bids = 0;

        for (let a of auctions) {
            bids += a.numBids;
        }

        return auctions.length ? bids / auctions.length : 0;
    }

    getAveragePercentageAuctionProgress(items: [IApiAuction]): number {
        let auctionProgress = 0;
        for (let auction of items) {
            auctionProgress += auction.currentHighestBidValue / auction.minimumRequiredAsk * 100;
        }

        return auctionProgress / items.length;
    }
}