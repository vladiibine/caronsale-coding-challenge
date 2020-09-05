import {injectable} from "inversify";

import {ConfigOption, IConfig} from "../interface/IConfig";

const CONFIGS = {
    [ConfigOption.USER_EMAIL_ID]: 'salesman@random.com',
    [ConfigOption.PASSWORD]: '123test',
    [ConfigOption.API_BASE_URL]: `https://caronsale-backend-service-dev.herokuapp.com`,
    [ConfigOption.API_BUYER_AUCTIONS]: `api/v2/auction/buyer/`,
    [ConfigOption.API_AUTHENTICATION_ENDPOINT]: `api/v1/authentication`,
}

/**
 * This class is mostly useful so that tests are easier to write
 * ...because of course the CONFIGS constant could just as well be used.
 * However, configurations are not trivial things, so better to have a
 * class which manages them.
 *
 */
@injectable()
export class Config implements IConfig {
    getOption(option: ConfigOption): string {
        let result = CONFIGS[option];

        if (result === undefined){
            throw new Error("Provided option doesn't exist!")
        } else {
            return result;
        }
    }
}