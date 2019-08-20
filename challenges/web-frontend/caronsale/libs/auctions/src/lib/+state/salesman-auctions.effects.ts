import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { switchMap } from 'rxjs/operators';
import { AuctionsService } from '../auctions.service';
import * as SalesmanAuctionsActions from './salesman-auctions.actions';
import {
  SalesmanAuctionsPartialState
  // SalesmanAuctionsState
} from './salesman-auctions.reducer';

@Injectable()
export class SalesmanAuctionsEffects {
  // loadSalesmanAuctions$ = createEffect(() =>
  //   this.dataPersistence.navigation(BuyerOverviewComponent, {
  //     onError: (action: ActivatedRouteSnapshot, error: any) => {
  //       // console.error('Error', error);
  //       // return SalesmanAuctionsActions.loadSalesmanAuctionsFailure({ error });
  //       return null;
  //     },
  //     run: (a: ActivatedRouteSnapshot, state: SalesmanAuctionsState) => {
  //       console.log('HJKHKH');
  //       return this.auctionsService.getSalesmanAuctions().pipe(
  //         take(1),
  //         switchMap(salesmanAuctions => {
  //           return [
  //             SalesmanAuctionsActions.loadSalesmanAuctionsSuccess({
  //               salesmanAuctions
  //             })
  //           ];
  //         })
  //       );
  //     }
  //   })
  // );

  loadSalesmanAuctions$ = createEffect(() =>
    this.dataPersistence.fetch(SalesmanAuctionsActions.loadSalesmanAuctions, {
      onError: (
        action: ReturnType<typeof SalesmanAuctionsActions.loadSalesmanAuctions>,
        error
      ) => {
        console.error('Error', error);
        return SalesmanAuctionsActions.loadSalesmanAuctionsFailure({ error });
      },
      run: (
        action: ReturnType<typeof SalesmanAuctionsActions.loadSalesmanAuctions>,
        state: SalesmanAuctionsPartialState
      ) => {
        console.log('effect loadSalesmanAuctions');
        return this.auctionsService.getSalesmanAuctions().pipe(
          // take(1),
          switchMap(salesmanAuctions => {
            return [
              SalesmanAuctionsActions.loadSalesmanAuctionsSuccess({
                salesmanAuctions
              })
            ];
          })
        );
      }
    })
  );

  constructor(
    private actions$: Actions,
    private auctionsService: AuctionsService,
    private dataPersistence: DataPersistence<SalesmanAuctionsPartialState>
  ) {}
}
