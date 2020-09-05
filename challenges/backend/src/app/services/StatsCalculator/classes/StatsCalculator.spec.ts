import 'mocha';
import "reflect-metadata";
import * as sinon from 'sinon';

describe('StatsCalculator unit', () => {
    context('.getAverageNumberOfBids()', () => {
        context('happy flow', () => {
            it('handles 1 auction');
            it('handles 3 auctions');
            it('handles multiple pages of auctions TODO - not sure how pagination works!');
        });

        context('error flow', () => {
            it('handles 0 auctions');
            it('handles more auctions than can fit in memory');
        });
    });

    context('.getAveragePercentageAuctionProgress()', () => {
        context('happy flow', () => {
            it('handles 1 auction');
            it('handles 3 auctions');
            it('handles multiple pages of auctions - TODO not sure how pagination works');
        });
        context('error flow', ()=>{
            it('handles 0 auctions');
            it('handles more auctions than can fit in memory');
        })
    })
});