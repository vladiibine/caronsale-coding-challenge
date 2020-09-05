import 'mocha';
import "reflect-metadata";
import {expect} from 'chai';

import * as sinon from 'sinon';
import {StatsCalculator} from "./StatsCalculator";
import {IApiAuction} from "../../CarOnSaleClient/interface/ICarOnSaleClient";

describe('StatsCalculator unit', () => {
    context('.getAverageNumberOfBids()', () => {
        context('happy flow', () => {
            it('handles 1 auction', () => {
                const statsCalculator = new StatsCalculator();

                const avgNumberOfBids = statsCalculator.getAverageNumberOfBids(
                    [{numBids: 3, minimumRequiredAsk: 1, currentHighestBidValue: 4}]
                );

                expect(avgNumberOfBids).to.equal(3);
            });
            it('handles 3 auctions', () => {
                const statsCalculator = new StatsCalculator();

                const avgNumberOfBids = statsCalculator.getAverageNumberOfBids(
                    [
                        {numBids: 3, minimumRequiredAsk: 1, currentHighestBidValue: 4} as IApiAuction,
                        {numBids: 4, minimumRequiredAsk: 1, currentHighestBidValue: 4} as IApiAuction,
                        {numBids: 6, minimumRequiredAsk: 1, currentHighestBidValue: 4} as IApiAuction
                    ]
                );

                expect(avgNumberOfBids).to.equal((3 + 4 + 6) / 3);
            });
            it('handles multiple pages of auctions TODO - not sure how pagination works!');
        });

        context('error flow', () => {
            it('handles 0 auctions', () => {
                const statsCalculator = new StatsCalculator();

                const avgNumberOfBids = statsCalculator.getAverageNumberOfBids(
                    []
                );

                expect(avgNumberOfBids).to.equal(0);
            });
        });
    });

    context('.getAveragePercentageAuctionProgress()', () => {
        context('happy flow', () => {
            it('handles 1 auction', () => {
                const statsCalculator = new StatsCalculator();

                const result = statsCalculator.getAveragePercentageAuctionProgress(
                    [
                        {numBids: 1, currentHighestBidValue: 4, minimumRequiredAsk: 9}
                    ]
                );

                expect(result).to.equal(4 / 9 * 100);
            });
            it('handles 3 auctions', () => {
                const statsCalculator = new StatsCalculator();

                const result = statsCalculator.getAveragePercentageAuctionProgress(
                    [
                        {numBids: 1, currentHighestBidValue: 4, minimumRequiredAsk: 9},
                        {numBids: 1, currentHighestBidValue: 5, minimumRequiredAsk: 9},
                        {numBids: 1, currentHighestBidValue: 6, minimumRequiredAsk: 9},
                    ]
                );

                expect(result).to.closeTo(5 / 9 * 100, 0.000001);
            });
            it('handles multiple pages of auctions - TODO not sure how pagination works');
        });
        context('error flow', () => {
            it('handles 0 auctions', () => {
                const statsCalculator = new StatsCalculator();

                const result = statsCalculator.getAveragePercentageAuctionProgress(
                    []
                );
                expect(result).to.equal(0);
            });
        })
    })
});