import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SalesmanAuctionsActions from './salesman-auctions.actions';
import { SalesmanAuctionsEntity } from './salesman-auctions.models';

export const SALESMANAUCTIONS_FEATURE_KEY = 'salesmanAuctions';

export interface SalesmanAuctionsState
  extends EntityState<SalesmanAuctionsEntity> {
  selectedId?: string | number; // which SalesmanAuctions record has been selected
  loaded: boolean; // has the SalesmanAuctions list been loaded
  error?: string | null; // last none error (if any)
}

export interface SalesmanAuctionsPartialState {
  readonly [SALESMANAUCTIONS_FEATURE_KEY]: SalesmanAuctionsState;
}

export const salesmanAuctionsAdapter: EntityAdapter<
  SalesmanAuctionsEntity
> = createEntityAdapter<SalesmanAuctionsEntity>();

export const initialState: SalesmanAuctionsState = salesmanAuctionsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false
  }
);

const salesmanAuctionsReducer = createReducer(
  initialState,
  on(SalesmanAuctionsActions.loadSalesmanAuctions, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    SalesmanAuctionsActions.loadSalesmanAuctionsSuccess,
    (state, { salesmanAuctions }) =>
      salesmanAuctionsAdapter.addAll(salesmanAuctions, {
        ...state,
        loaded: true
      })
  ),
  on(
    SalesmanAuctionsActions.loadSalesmanAuctionsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(
  state: SalesmanAuctionsState | undefined,
  action: Action
) {
  return salesmanAuctionsReducer(state, action);
}
