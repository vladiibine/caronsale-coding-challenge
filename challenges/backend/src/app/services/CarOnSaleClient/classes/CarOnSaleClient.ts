import * as crypto from 'crypto';
import {injectable, inject} from "inversify";
import {default as axios} from 'axios';

import {ICarOnSaleClient, ERRORS, IApiResult} from "../interface/ICarOnSaleClient";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";

export const BASE_URL = `https://caronsale-backend-service-dev.herokuapp.com`;

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    private userMailId: string = 'salesman@random.com';
    // private userMailId: string = 'salesman';
    private password: string = '123test';

    private authToken: string = null;
    private userId: string = null;

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger
    ) {
    }

    async getRunningAuctions(): Promise<IApiResult> {
        if (this.authToken == null) {
            try {
                await this.authenticate();

            } catch (e) {
                return {
                    error: ERRORS.COULD_NOT_AUTHENTICATE,
                    data: null,
                }
            }
        }
        // The result contains a "userId" and a "token" field that have to be set as "userid" / "authtoken"
        // HTTP header in further requests.
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/api/v2/auction/buyer/`,
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

    private static hashPassword(password: string): string {
        let hash = `${password}`;

        for (let i = 0; i < 5; i++) {
            hash = crypto.createHash('sha512').update(hash).digest('hex');
        }

        return hash;
    }

    private async authenticate() {
        let path = `v2/auction/buyer`;

        let endpoint = `${BASE_URL}/${path}`;
        let authEndpoint = `${BASE_URL}/api/v1/authentication/${this.userMailId}`;

        let authResult = await axios.put(
            `${authEndpoint}`,
            {
                password: CarOnSaleClient.hashPassword(this.password),
            },
            {
                headers: {
                    'content-type': 'application/json'
                }
            }
        );

        this.logger.log('Successfully authenticated!');

        this.authToken = authResult.data.token;
        this.userId = authResult.data.userId;
    }
}