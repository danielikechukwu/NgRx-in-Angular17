import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
import { Product } from './IProduct';

const getProductFeatureState = createFeatureSelector<ProductState>('product');

//Toggle product code
export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state: ProductState): boolean => {
    return state.showProductCode;
  }
);

//Get Current product Id
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state: ProductState): number | null => {
    return state.currentProductId;
  }
);

//Get Current product
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state: ProductState, currentProductId: number | null): Product | null => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: '',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId)!
        : null;
    }
  }
);

//Get Products array
export const getProducts = createSelector(
  getProductFeatureState,
  (state: ProductState): Product[] => {
    return state.products;
  }
);
