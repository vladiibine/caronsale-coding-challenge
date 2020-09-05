// Good guide to mocha testing:
// https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d/
// and a guide to using sinon for mocking/stubbing
// https://sinonjs.org/
import 'mocha';
import "reflect-metadata";
import * as sinon from 'sinon';

import {CarOnSaleClient} from "./CarOnSaleClient";
import {ConfigOption} from "../../Config/interface/IConfig";
import {ERRORS} from "../interface/ICarOnSaleClient";

const expect = require('chai').expect;

describe('CarOnSaleClient unit', () => {
    context(".hashPassword()", () => {
        it('hash empty string', () => {
            expect(CarOnSaleClient.hashPassword('')).to.equal('1a33bb15daa9e600dce1cb506148a295a42606192980d17aa197d7d696eb22403b0c75ac94abee3951d3ac799771e3553298a0498100902adcb6d778c73b2b23');
        });

        it('hash non-empty string', () => {
            expect(CarOnSaleClient.hashPassword('1')).to.equal('62dedbd6e1b2794ec192a110da59976bec5fea7f32d926233343e3fd3bcafdcadaf82358391216bf15047da1bbc25af51cdb817964ce689145de97cb6e071d2a')
        });

        it("handles null", () => {
            expect(CarOnSaleClient.hashPassword(null)).to.equal('bb925e7abcbba1b5edb081263d3090e534c15dc94242bd35f125df8a75a74d5e69f31be53d8fd710ef890f4eadfa8985fb1b6d80edf3dbde4b811076b5800897')
        });
    });

    context(".authenticate()", () => {
        /**
         * Official mocking for the authenticate function.
         * Would move this to a fixture file.
         * @param token - If authentication succeeds, will return this token
         * @param userId - if authentication succeeds, will return this userId
         * @param getOptionValues - values to call config.getOption with (4 values!)
         * @param success - whether the mocked authentication should succeed
         */
        function configureAuthenticateMocks(
            token: string, userId: string, getOptionValues: Array<string>,
            success: boolean) {
            let config_mock = sinon.fake();

            // config_mock.getOption = sinon.fake.returns(33);
            config_mock.getOption = sinon.stub();
            config_mock.getOption.onCall(0).returns(getOptionValues[0]);
            config_mock.getOption.onCall(1).returns(getOptionValues[1]);
            config_mock.getOption.onCall(2).returns(getOptionValues[2]);
            config_mock.getOption.onCall(3).returns(getOptionValues[3]);


            let http_client_mock = sinon.fake();
            if (success) {
                http_client_mock.put = sinon.fake.resolves(
                    {data: {token: token, userId: userId}}
                );
            } else {
                http_client_mock.put = sinon.fake.rejects('noop');
            }
            return {config_mock, http_client_mock};
        }

        context("happy flow", () => {
            it("calls dependencies properly", () => {
                let {config_mock, http_client_mock} = configureAuthenticateMocks(
                    'tokenAe2342n48',
                    'userId@419014nsd',
                    ['11', '22', '33'],
                    true
                );

                return CarOnSaleClient.authenticate(
                    config_mock, http_client_mock
                ).then(result => {
                    expect(config_mock.getOption.callCount).to.equal(4);
                    expect(config_mock.getOption.calledWith(ConfigOption.API_BASE_URL)).to.be.true;
                    expect(config_mock.getOption.calledWith(ConfigOption.API_AUTHENTICATION_ENDPOINT)).to.be.true;
                    expect(config_mock.getOption.calledWith(ConfigOption.USER_EMAIL_ID)).to.be.true;
                    expect(config_mock.getOption.calledWith(ConfigOption.PASSWORD)).to.be.true;

                    expect(http_client_mock.put.callCount).to.equal(1);
                    expect(http_client_mock.put.calledWith(`11/22/33`));


                }).catch(error => {
                    throw new Error(error)
                })
            });

            it("Given dependency stubs, returns proper value", () => {
                let {config_mock, http_client_mock} = configureAuthenticateMocks(
                    'token-4324ngfd',
                    'userId-24324',
                    ['', '', '', ''],
                    true
                );

                return CarOnSaleClient.authenticate(
                    config_mock, http_client_mock
                ).then(result => {
                    expect(result.authToken).to.equal('token-4324ngfd');
                    expect(result.userId).to.equal('userId-24324')

                }).catch(error => {
                    throw new Error(error)
                })
            });
        });

        context("can't authenticate", () => {
            it('throws', () => {
                let {config_mock, http_client_mock} = configureAuthenticateMocks(
                    'tokenAe2342n48',
                    'userId@419014nsd',
                    ['11', '22', '33'],
                    false,
                );

                return CarOnSaleClient.authenticate(
                    config_mock, http_client_mock
                ).then((value => {
                    expect.fail('Was not supposed to resolve!')

                })).catch(reason => {
                    // Nothing! the test passes
                })
            })
        })

    });


    context(".getRunningAuctions()", () => {
        /**
         "Official" mocking for the function. Would move this to a fixture file.
         * @param authToken
         * @param userId
         * @param getOptionBaseUrl
         * @param getOptionBuyerAuctions
         * @param apiData
         * @param auth_success - whether the authentication API call was successful
         * @param api_success - whether the Auctions endpoint returned success
         * @param api_error_reason - when the Auctions endpoint fails, return this as the reason
         */
        function configureGetRunningAuctionsMocks(
            authToken: string, userId: string, getOptionBaseUrl: string, getOptionBuyerAuctions: string, apiData: string,
            auth_success: boolean = true, api_success: boolean = true, api_error_reason: string = '') {

            let authenticate_stub = sinon.stub(CarOnSaleClient, 'authenticate');
            if (auth_success) {
                authenticate_stub.resolves({authToken: authToken, userId: userId});
            } else {
                authenticate_stub.rejects('noop');
            }

            let logger_mock = sinon.fake();
            logger_mock.log = sinon.fake();
            let config_mock = sinon.fake();
            config_mock.getOption = sinon.stub();
            config_mock.getOption.onCall(0).returns(getOptionBaseUrl);
            config_mock.getOption.onCall(1).returns(getOptionBuyerAuctions);
            let http_client_mock = sinon.fake();
            if (api_success) {
                http_client_mock.get = sinon.stub().resolves({data: apiData});
            } else {
                http_client_mock.get = sinon.stub().rejects(api_error_reason);
            }
            return {authenticate_stub, logger_mock, config_mock, http_client_mock};
        }

        context("happy flow", () => {
            it("Calls dependencies properly", () => {
                let {authenticate_stub, logger_mock, config_mock, http_client_mock} =
                    // use different mocked values, so the test code is searchable easier
                    configureGetRunningAuctionsMocks('3mr41', 'mrot4', '1rfe4', '4gmbNe', 'noop-nr324');
                let client = new CarOnSaleClient(
                    logger_mock, config_mock, http_client_mock
                );

                return client.getRunningAuctions().then(value => {
                    expect(authenticate_stub.callCount).to.equal(1);
                    expect(authenticate_stub.calledWith(config_mock, http_client_mock))
                    expect(config_mock.getOption.callCount).to.equal(2);
                    expect(config_mock.calledWith(ConfigOption.API_BASE_URL));
                    expect(config_mock.calledWith(ConfigOption.API_BUYER_AUCTIONS));

                    expect(http_client_mock.get.calledWith(`1rfe4/4gmb`));
                })
            });

            it("Returns a Promise<IApiResult>", () => {
                let {logger_mock, config_mock, http_client_mock} =
                    configureGetRunningAuctionsMocks('noop-4rv', 'noop-c93nf', 'asdf3mn4', 'zxcv00mn', 'noop-cmr2');

                let client = new CarOnSaleClient(
                    logger_mock, config_mock, http_client_mock
                );

                return client.getRunningAuctions().then(value => {
                    let {error, data} = value;
                    expect(error).to.be.null;
                    expect(data).to.equal('noop-cmr2');
                });


            });
        });

        context('API fails, returns errors', () => {
            it("returns authentication failure error", () => {
                let {authenticate_stub, logger_mock, config_mock, http_client_mock} =
                    // use different mocked values, so the test code is searchable easier
                    configureGetRunningAuctionsMocks(
                        'authToken234234h',
                        'userId34234',
                        '1rfe4',
                        '4gmbNe',
                        'noop-nr324',
                        false,
                    );
                let client = new CarOnSaleClient(
                    logger_mock, config_mock, http_client_mock
                );

                client.getRunningAuctions().then(value => {
                    expect(value).to.deep.equal({error: ERRORS.COULD_NOT_AUTHENTICATE, data: null})

                }).catch(reason => {
                    expect.fail('Should not raise!')
                })
            });

            it("logs and throws when the API doesn't return successfully", () => {
                let {authenticate_stub, logger_mock, config_mock, http_client_mock} =
                    // use different mocked values, so the test code is searchable easier
                    configureGetRunningAuctionsMocks(
                        'authToken234234h',
                        'userId34234',
                        '1rfe4',
                        '4gmbNe',
                        'noop-nr324',
                        true,
                        false,
                        'api-error-message-4124nfsif'
                    );
                let client = new CarOnSaleClient(
                    logger_mock, config_mock, http_client_mock
                );

                return client.getRunningAuctions()
                    .then((value => {
                        expect.fail('Should not resolve!')
                    }))
                    .catch(reason => {
                        expect(logger_mock.log.getCalls())
                            .to.be.an('array')
                            .to.have.lengthOf(2);

                        expect(logger_mock.log.getCalls()[0].args)
                            .to.be.an('array')
                            .to.have.lengthOf('1')
                            .to.include.members(['Successfully authenticated!'])

                        expect(logger_mock.log.getCalls()[1].args)
                            .to.be.an('array')
                            .to.have.lengthOf(1)
                            .to.include.members(["Couldn't get the auction information: api-error-message-4124nfsif"])
                    });
            });
        });

    });

    afterEach(() => {
        sinon.restore()
    });
});
