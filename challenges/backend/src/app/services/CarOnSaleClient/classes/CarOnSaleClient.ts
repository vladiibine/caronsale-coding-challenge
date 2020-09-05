import * as crypto from 'crypto';
import {inject, injectable} from "inversify";
import {AxiosStatic} from 'axios';

/* tslint:disable */
// import * as jsonschema from "jsonschema"; // can't stub things in imported modules
const jsonschema = require('jsonschema');  // can only stub things out in required modules
/* tslint:enable */

import {ERRORS, IApiResult, ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {ConfigOption, IConfig} from "../../Config/interface/IConfig";
import {ILogger} from "../../Logger/interface/ILogger";
import {API_DATA_SCHEMA} from "../interface/schemas";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    private authToken: string = null;
    private userId: string = null;

    public static hashPassword(password: string): string {
        let hash = `${password}`;

        for (let i = 0; i < 5; i++) {
            hash = crypto.createHash('sha512').update(hash).digest('hex');
        }

        return hash;
    }

    public static async authenticate(config: IConfig, httpClient: AxiosStatic): Promise<{ authToken: string, userId: string }> {
        const apiBaseUrl = config.getOption(ConfigOption.API_BASE_URL);
        const apiAuthenticationPath = config.getOption(ConfigOption.API_AUTHENTICATION_ENDPOINT);
        const userEmailId = config.getOption(ConfigOption.USER_EMAIL_ID);

        const authEndpoint = `${apiBaseUrl}/${apiAuthenticationPath}/${userEmailId}`;
        const authResult = await httpClient.put(
            `${authEndpoint}`,
            {
                password: CarOnSaleClient.hashPassword(
                    config.getOption(ConfigOption.PASSWORD)
                ),
            },
            {
                headers: {
                    'content-type': 'application/json'
                }
            }
        );

        return {authToken: authResult.data.token, userId: authResult.data.userId}
    }

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CONFIG) private config: IConfig,
        @inject(DependencyIdentifier.HTTP_CLIENT) private httpClient: AxiosStatic,
    ) {
    }

    public async getRunningAuctions(): Promise<IApiResult> {
        if (this.authToken === null) {
            try {
                const {authToken, userId} = await CarOnSaleClient.authenticate(this.config, this.httpClient);
                this.authToken = authToken;
                this.userId = userId;

                this.logger.log(`Successfully authenticated!`);

            } catch (e) {
                this.logger.log(`For some reason, can't get the auctions! Aborting!`);

                return Promise.resolve({
                    error: ERRORS.COULD_NOT_AUTHENTICATE,
                    data: null,
                })
            }
        }
        // The result contains a "userId" and a "token" field that have to be set as "userid" / "authtoken"
        // HTTP header in further requests.
        return new Promise((resolve, reject) => {
            const baseUrl = this.config.getOption(ConfigOption.API_BASE_URL);
            const buyerAuctions = this.config.getOption(ConfigOption.API_BUYER_AUCTIONS);

            this.httpClient.get(`${baseUrl}/${buyerAuctions}`,
                {
                    headers: {
                        'userid': this.userId,
                        'authtoken': this.authToken,
                    }
                }
            )
                .then(response => {
                    // VladA: left this line to help with debugging
                    // console.log(JSON.stringify(response.data))
                    // debugger
                    const validationResult = jsonschema.validate(response.data, API_DATA_SCHEMA);

                    if (validationResult.errors.length === 0) {
                        resolve({error: null, data: response.data})

                    } else {
                        this.logger.log(`ERROR: API returned incorrect JSON: ${validationResult.toString()}`);
                        reject({error: ERRORS.INCORRECT_SCHEMA, data: response.data})
                    }

                })
                .catch(reason => {
                    this.logger.log(`Couldn't get the auction information: ${reason}`);
                    reject(reason);
                })
        });
    }
}