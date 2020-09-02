import {injectable} from "inversify";

import {ConfigOption, IConfig} from "../interface/IConfig";

@injectable()
export class Config implements IConfig {
    getOption(option: ConfigOption): string {
        // TODO - this feels a little over-engineered
        //  Did it so I could mock the getOption method though
        //  and because I expect an actual config object to have
        //  methods that read environment variables.
        //  For this project, a JS object could have been enough though

        if (option === ConfigOption.USER_EMAIL_ID) {
            return 'salesman@random.com'

        } else if (option === ConfigOption.PASSWORD) {
            return '123test';

        } else if (option === ConfigOption.API_BASE_URL) {
            return `https://caronsale-backend-service-dev.herokuapp.com`;

        } else if (option === ConfigOption.API_BUYER_AUCTIONS){
            return `api/v2/auction/buyer/`;

        } else if (option === ConfigOption.API_AUTHENTICATION_ENDPOINT){
            return `api/v1/authentication`;
        }
        throw new Error("Provided option doesn't exist!")
    }
}