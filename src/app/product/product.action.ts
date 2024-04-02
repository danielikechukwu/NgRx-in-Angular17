import { createAction, props } from '@ngrx/store';
import { Product } from './IProduct';

export const toggleProductCode = createAction(
  '[Product List Component] Toggle product code'
);

export const setCurrentProduct = createAction(
  '[Product List Component] Set current product',
  props<{ product: Product }>()
);

export const clearCurrentProduct = createAction(
  '[Product Edit Component] Clear current product'
);

export const initCurrentProduct = createAction(
  '[Product List Component] Initialize current product'
);

//Asynchronously loading a product from the Server.

export const loadProduct = createAction('[Product] load product');

export const loadProductSuccess = createAction(
  '[Product] load product Success',
  props<{ product: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product] load product Failure',
  props<{ error: string }>()
);
