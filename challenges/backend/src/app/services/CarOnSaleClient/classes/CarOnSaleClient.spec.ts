// Good guide to mocha testing:
// https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d/
// and a guide to using sinon for mocking/stubbing
// https://sinonjs.org/
import 'mocha';
import "reflect-metadata";
import * as sinon from 'sinon';

import {CarOnSaleClient} from "./CarOnSaleClient";
import {ConfigOption} from "../../Config/interface/IConfig";

const expect = require('chai').expect;

describe('CarOnSaleClient unit', () => {
    context("hashPassword", () => {
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

    context("authenticate", () => {
        it("calls dependencies properly", () => {
            let config_mock = sinon.fake();

            // config_mock.getOption = sinon.fake.returns(33);
            config_mock.getOption = sinon.stub();
            config_mock.getOption.onCall(0).returns(11);
            config_mock.getOption.onCall(1).returns(22);
            config_mock.getOption.onCall(2).returns(33);
            config_mock.getOption.onCall(3).returns(44);


            let http_client_mock = sinon.fake();
            http_client_mock.put = sinon.fake.resolves(
                {data: {token: 'noop', userId: 'noop2'}}
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

        it("Uses dependency values properly", () => {
            // sinon.replace()
            let config_mock = sinon.fake();
            config_mock.getOption = sinon.fake();

            let http_client_mock = sinon.fake();
            http_client_mock.put = sinon.fake.returns(Promise.resolve(
                {
                    data: {
                        token: 'token1v93m',
                        userId: 'userId1313'
                    }
                }
            ));

            return CarOnSaleClient.authenticate(
                config_mock, http_client_mock
            ).then(result => {
                expect(result.authToken).to.equal('token1v93m');
                expect(result.userId).to.equal('userId1313')

            }).catch(error => {
                throw new Error(error)
            })
        });
    });

    afterEach(() => {
        sinon.restore()
    });
})

describe('Hello function', () => {

    it('test that the testing framework works', () => {
        // const result = hello();
        // @ts-ignore
        expect(1).to.equal(1);
    });

});