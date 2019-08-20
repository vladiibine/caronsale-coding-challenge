import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as SalesmanAuctionsActions from './salesman-auctions.actions';
import { SalesmanAuctionsEntity } from './salesman-auctions.models';

export const SALESMANAUCTIONS_FEATURE_KEY = 'salesmanAuctions';

export interface SalesmanAuctionsState
  extends EntityState<SalesmanAuctionsEntity> {
  error?: null | string; // last none error (if any)
  loaded: boolean; // has the SalesmanAuctions list been loaded
  selectedId?: number | string; // which SalesmanAuctions record has been selected
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
    error: null,
    loaded: false
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
  state: undefined | SalesmanAuctionsState,
  action: Action
) {
  return salesmanAuctionsReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = salesmanAuctionsAdapter.getSelectors();
