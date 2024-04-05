import { createAction, props } from '@ngrx/store';
import { Product } from './IProduct';

export const toggleProductCode = createAction(
  '[Product List Component] Toggle product code'
);

export const setCurrentProduct = createAction(
  '[Product List Component] Set current product',
  props<{ currentProductId: number }>()
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

//Asynchronously updating a product from the Server.
export const updateProduct = createAction(
  '[Product Edit] Update Product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product Edit] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Product Edit] Update Product Failure',
  props<{ error: string }>()
);

//Asychronously creating a product in the Server.
export const createProduct = createAction(
  '[Product Edit] Create Product',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product Edit] Creater',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product Edit] Create Product Failure',
  props<{ error: string }>()
);

//Asynchronously deleting a product in the Server
export const deleteProduct = createAction(
  '[Product Edit] Delete Product',
  props<{ id: number }>()
);

export const deleteProductSuccess = createAction(
  '[Product Edit] Delete Product Success'
);

export const deleteProductFailure = createAction(
  '[Product Edit] Delete Product Failure',
  props<{ error: string }>()
);
