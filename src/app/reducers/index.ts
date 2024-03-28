import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { productReducer, State } from '../product/product.reducer';

// export const State {

// }

export const reducers: ActionReducerMap<State> = {
  product: productReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
