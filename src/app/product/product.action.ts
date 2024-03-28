import { createAction, props } from '@ngrx/store';
import { Product } from './IProduct';

export const toggleProductCode = createAction(
  '[Product List Component] Toggle product code'
);

export const setCurrentProduct = createAction(
  '[Product List Component] Set current product',
  props<{ product: Product}>()
);

export const initCurrentProduct = createAction(
  '[Product List Component] Initialize current product',
  props<{product: Product}>()

);


