import {inject, injectable} from "inversify";
import "reflect-metadata";

import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {IApiAuction, IApiResult, ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {
    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient,
    ) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);

        let auctions = await this.carOnSaleClient.getRunningAuctions();

        if (auctions.error) {
            this.logger.log(`For some reason, can't get the auctions! Aborting!`);
            process.exit(-1);  //and of course, by -1, we mean 255

        } else {
            // VladA - for simplicity's sake, I assume that auction.data.total refers to the number of items
            this.logger.log(`The number of auctions might be ${auctions.data.total}`)

            // VladA: TODO - not handling pagination atm, as I don't know how it works
            this.logger.log(`The average number of bids: ${AuctionMonitorApp.getAverageNumberOfBids(auctions.data.items)}`)

            // VladA: TODO - not handling pagination here, as I don't know how it works
            this.logger.log(`The average percentage of auction progress: ${AuctionMonitorApp.getAveragePercentageAuctionProgress(auctions.data.items)}`)
        }
    }

    // TODO - move this to an injectable class. Probably testing would be nicer like that
    private static getAverageNumberOfBids(auctions: [IApiAuction]): number {
        let bids = 0;

        for (let a of auctions) {
            bids += a.numBids;
        }

        return auctions.length ? bids / auctions.length : 0;
    }

    // TODO - move this to an injectable class. Probably testing would be nicer like that
    private static getAveragePercentageAuctionProgress(items: [IApiAuction]): number {
        let auctionProgress = 0;
        for (let auction of items) {
            auctionProgress += auction.currentHighestBidValue / auction.minimumRequiredAsk * 100;
        }

        return auctionProgress / items.length;
    }
}