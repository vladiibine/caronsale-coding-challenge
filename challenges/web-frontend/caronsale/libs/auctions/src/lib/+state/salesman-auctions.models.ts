import * as moment from 'moment';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interface for the 'SalesmanAuctions' data
 */
export interface SalesmanAuctionsEntity {
  id: number | string; // Primary ID
}

export class SalesmanAuctionsView {
  public amIHighestBidder = false;
  public currentHighestBidValue = 0;
  public endingTime = '';
  public id = 0;
  public imageUrl = '';
  public label = '';
  public vehicleData: VehicleData = {
    ez: '',
    fuelTypeText: '',
    mileageInKm: '',
    transmissionText: ''
  };

  public timeLeft$: Observable<string> = of('');

  constructor(obj: any) {
    Object.assign(this, obj);
    this.timeLeft$ = timer(0, 1000).pipe(
      map(() => {
        const now = moment();
        const endingTime = moment(this.endingTime);
        const duration = moment.duration(endingTime.diff(now));
        const timeLeft = `${duration.days()} days ${duration.hours()}:${duration.minutes()}:${duration.seconds()}h`;
        return timeLeft;
      })
    );
  }
}

export interface VehicleData {
  ez: string;
  fuelTypeText: string;
  mileageInKm: string;
  transmissionText: string;
}
