import {injectable} from "inversify";

import {IStatsCalculator} from "../interface/IStatsCalculator";
import {IApiAuction} from "../../CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class StatsCalculator implements IStatsCalculator {
    public getAverageNumberOfBids(auctions: IApiAuction[]): number {
        let bids = 0;

        for (const a of auctions) {
            bids += a.numBids;
        }

        return auctions.length ? bids / auctions.length : 0;
    }

    public getAveragePercentageAuctionProgress(items: IApiAuction[]): number {
        let auctionProgress = 0;
        for (const auction of items) {
            auctionProgress += auction.currentHighestBidValue / auction.minimumRequiredAsk * 100;
        }

        return auctionProgress / items.length;
    }
}