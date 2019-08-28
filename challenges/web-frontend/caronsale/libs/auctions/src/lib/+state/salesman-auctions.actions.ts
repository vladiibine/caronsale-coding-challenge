import { createAction, props } from '@ngrx/store';
import { SalesmanAuctionsEntity } from './salesman-auctions.models';

export const loadSalesmanAuctions = createAction(
  '[SalesmanAuctions] Load SalesmanAuctions'
);

export const loadSalesmanAuctionsSuccess = createAction(
  '[SalesmanAuctions] Load SalesmanAuctions Success',
  props<{ salesmanAuctions: SalesmanAuctionsEntity[] }>()
);

export const loadSalesmanAuctionsFailure = createAction(
  '[SalesmanAuctions] Load SalesmanAuctions Failure',
  props<{ error: any }>()
);
