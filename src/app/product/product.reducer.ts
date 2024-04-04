import { createAction, createReducer, on } from '@ngrx/store';
import * as ProductReducer from './product.action';
import { Product } from './IProduct';
import * as AppState from '../state/app.state';
import { error } from 'console';

export interface State extends AppState.State {
  product: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

export const productReducer = createReducer<ProductState>(
  initialState as ProductState,

  on(ProductReducer.toggleProductCode, (state: ProductState): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),

  on(
    ProductReducer.setCurrentProduct,
    (state: ProductState, action): ProductState => {
      return {
        ...state,
        currentProductId: action.currentProductId,
      };
    }
  ),

  on(
    ProductReducer.clearCurrentProduct,
    (state: ProductState): ProductState => {
      return {
        ...state,
        currentProductId: null,
      };
    }
  ),

  on(ProductReducer.initCurrentProduct, (state: ProductState): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),

  on(
    ProductReducer.loadProductSuccess,
    (state: ProductState, action): ProductState => {
      return {
        ...state,
        products: action.product,
        error: '',
      };
    }
  ),

  on(
    ProductReducer.loadProductFailure,
    (state: ProductState, action): ProductState => {
      return {
        ...state,
        error: action.error,
        products: [],
      };
    }
  ),

  on(
    ProductReducer.updateProductSuccess,
    (state: ProductState, action): ProductState => {
      const updateProduct: Product[] = state.products.map(item => action.product.id === item.id ? action.product : item);

      return {
        ...state,
        products: updateProduct,
        currentProductId: action.product.id,
        error: '',
      }
    }
  ),

  on(ProductReducer.updateProductFailure, (state: ProductState, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  })
);
