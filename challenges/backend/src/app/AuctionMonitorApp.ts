import {inject, injectable} from "inversify";
import "reflect-metadata";

import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {IStatsCalculator} from "./services/StatsCalculator/interface/IStatsCalculator";

@injectable()
export class AuctionMonitorApp {
    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient,
        @inject(DependencyIdentifier.STATS_CALCULATOR) private statsCalculator: IStatsCalculator,
    ) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);

        const auctions = await this.carOnSaleClient.getRunningAuctions();

        if (auctions.error) {
            process.exit(-1);  // and of course, by -1, we mean 255

        } else {
            // VladA - for simplicity's sake, I assume that auction.data.total refers to the number of items
            this.logger.log(`The number of auctions might be ${auctions.data.total}`)

            // VladA: TODO - not handling pagination atm, as I don't know how it works
            this.logger.log(`The average number of bids: ${this.statsCalculator.getAverageNumberOfBids(auctions.data.items)}`)

            // VladA: TODO - not handling pagination here, as I don't know how it works
            this.logger.log(`The average percentage of auction progress: ${this.statsCalculator.getAveragePercentageAuctionProgress(auctions.data.items)}`)
        }
    }
}