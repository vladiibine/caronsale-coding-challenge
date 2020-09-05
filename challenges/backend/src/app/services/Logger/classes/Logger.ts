import {ILogger} from "../interface/ILogger";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class Logger implements ILogger {

    public log(message: string): void {
        /* tslint:disable */
        console.log(`[LOG]: ${message}`);
        /* tslint:enable */
    }

}