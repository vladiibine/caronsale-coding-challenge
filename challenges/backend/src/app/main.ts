import {AxiosAdapter, AxiosInstance, AxiosStatic, default as axios} from 'axios';
import {Container} from "inversify";

import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {CarOnSaleClient} from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import {IConfig} from "./services/Config/interface/IConfig";
import {Config} from "./services/Config/classes/Config";
import construct = Reflect.construct;

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
interface AxiosInterface {
    new (...args: any[]): AxiosStatic
}

container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
container.bind<IConfig>(DependencyIdentifier.CONFIG).to(Config);

// this took me some time to figure out! Now I have Stockholm Syndrome and
// like dependency injection! XD
container.bind<AxiosStatic>(DependencyIdentifier.HTTP_CLIENT).toConstantValue(axios);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
