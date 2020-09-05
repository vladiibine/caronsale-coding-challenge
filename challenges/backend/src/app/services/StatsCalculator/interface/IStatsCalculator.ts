import {IApiAuction} from "../../CarOnSaleClient/interface/ICarOnSaleClient";

export interface IStatsCalculator {
    getAverageNumberOfBids(auctions: [IApiAuction]): number;

    getAveragePercentageAuctionProgress(items: [IApiAuction]): number;
}