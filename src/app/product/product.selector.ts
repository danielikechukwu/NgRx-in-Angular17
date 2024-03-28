import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
import { Product } from './IProduct';

const getProductFeatureState = createFeatureSelector<ProductState>('product');

//Toggle product code
export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state: ProductState): boolean => {
    return state.showProductCode
  }
);

//Get Current product
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state: ProductState): Product | null => {
    return state.currentProduct
  }
);

//Get Products array
export const getProducts = createSelector(
    getProductFeatureState,
    (state: ProductState): Product[] => {
        return state.products
    }
)