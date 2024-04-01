import { createAction, createReducer, on } from '@ngrx/store';
import * as ProductReducer from './product.action';
import { Product } from './IProduct';
import * as AppState from '../state/app.state';

export interface State extends AppState.State {
  product: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product | null;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
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
        currentProduct: action.product,
      };
    }
  ),

  on(
    ProductReducer.clearCurrentProduct,
    (state: ProductState): ProductState => {
      return {
        ...state,
        currentProduct: null,
      };
    }
  ),

  on(ProductReducer.initCurrentProduct, (state: ProductState): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: '',
        description: '',
        starRating: 0,
      },
    };
  })
);
