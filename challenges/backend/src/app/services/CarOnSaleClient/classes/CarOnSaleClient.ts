import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";

export class CarOnSaleClient implements ICarOnSaleClient {
    getRunningAuctions(): Promise<any> {
        return Promise.resolve(undefined);
    }

}