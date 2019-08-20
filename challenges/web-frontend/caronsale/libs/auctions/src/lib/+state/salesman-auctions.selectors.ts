import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SALESMANAUCTIONS_FEATURE_KEY,
  SalesmanAuctionsPartialState,
  SalesmanAuctionsState,
  salesmanAuctionsAdapter
} from './salesman-auctions.reducer';
import * as fromSalesmanAuctionsReducer from './salesman-auctions.reducer';

// Lookup the 'SalesmanAuctions' feature state managed by NgRx
export const getSalesmanAuctionsState = createFeatureSelector<
  SalesmanAuctionsPartialState,
  SalesmanAuctionsState
>(SALESMANAUCTIONS_FEATURE_KEY);

const { selectAll, selectEntities } = salesmanAuctionsAdapter.getSelectors();

export const getSalesmanAuctionsLoaded = createSelector(
  getSalesmanAuctionsState,
  (state: SalesmanAuctionsState) => state.loaded
);

export const getSalesmanAuctionsError = createSelector(
  getSalesmanAuctionsState,
  (state: SalesmanAuctionsState) => state.error
);

export const getAllSalesmanAuctions = createSelector(
  getSalesmanAuctionsState,
  (state: SalesmanAuctionsState) => selectAll(state)
);

export const getSalesmanAuctionsEntities = createSelector(
  getSalesmanAuctionsState,
  (state: SalesmanAuctionsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSalesmanAuctionsState,
  (state: SalesmanAuctionsState) => state.selectedId
);

export const getSelected = createSelector(
  getSalesmanAuctionsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSalesmanAuctionsList = createSelector(
  getSalesmanAuctionsState,
  fromSalesmanAuctionsReducer.selectAll
);
