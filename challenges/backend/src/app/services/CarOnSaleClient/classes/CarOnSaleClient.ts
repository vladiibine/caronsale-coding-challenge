import * as crypto from 'crypto';
import {inject, injectable} from "inversify";
import {AxiosStatic, default as axios} from 'axios';

import {ERRORS, IApiResult, ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {ConfigOption, IConfig} from "../../Config/interface/IConfig";
import {ILogger} from "../../Logger/interface/ILogger";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    private authToken: string = null;
    private userId: string = null;

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CONFIG) private config: IConfig,
        @inject(DependencyIdentifier.HTTP_CLIENT) private http_client: AxiosStatic,
    ) {
    }

    async getRunningAuctions(): Promise<IApiResult> {
        if (this.authToken === null) {
            try {
                let {authToken, userId} = await CarOnSaleClient.authenticate(this.config, this.http_client);
                this.authToken = authToken;
                this.userId = userId;

                this.logger.log(`Successfully authenticated!`);

            } catch (e) {
                this.logger.log(`For some reason, can't get the auctions! Aborting!`);

                return {
                    error: ERRORS.COULD_NOT_AUTHENTICATE,
                    data: null,
                }
            }
        }
        // The result contains a "userId" and a "token" field that have to be set as "userid" / "authtoken"
        // HTTP header in further requests.
        return new Promise((resolve, reject) => {
            let baseUrl = this.config.getOption(ConfigOption.API_BASE_URL);
            let buyer_auctions = this.config.getOption(ConfigOption.API_BUYER_AUCTIONS);

            axios.get(`${baseUrl}/${buyer_auctions}`,
                {
                    headers: {
                        'userid': this.userId,
                        'authtoken': this.authToken,
                    }
                }
            )
            .then(response => {
                resolve({error: null, data: response.data})
            })
                .catch(reason => {this.logger.log(`Couldn't get the auction information: ${reason}`)})
        });
    }

    static hashPassword(password: string): string {
        let hash = `${password}`;

        for (let i = 0; i < 5; i++) {
            hash = crypto.createHash('sha512').update(hash).digest('hex');
        }

        return hash;
    }

    static async authenticate(config: IConfig, http_client: AxiosStatic): Promise<{authToken: string, userId: string}> {
        let apiBaseUrl = config.getOption(ConfigOption.API_BASE_URL);
        let apiAuthenticationPath = config.getOption(ConfigOption.API_AUTHENTICATION_ENDPOINT);
        let userEmailId = config.getOption(ConfigOption.USER_EMAIL_ID);

        let authEndpoint = `${apiBaseUrl}/${apiAuthenticationPath}/${userEmailId}`;
        let authResult = await http_client.put(
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
}