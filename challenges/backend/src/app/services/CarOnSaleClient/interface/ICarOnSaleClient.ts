/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<IApiResult>

}

export interface IApiAuction {
    numBids: number,
    currentHighestBidValue: number,
    minimumRequiredAsk: number,
}

export interface IApiResult {
    error: string,
    data: {
        items: [IApiAuction],
        page: number,  // assuming current page number
        total: number,  // assuming this means the total number of items. Could also mean total number of pages. Don't know
    },
}

export const ERRORS = {
    COULD_NOT_AUTHENTICATE: 'count_not_authenticate',
}