import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './product/product.service';
import * as ProductAction from './product/product.action';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store
  ) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadProduct),
      mergeMap(() => {
        return this.productService.getProducts().pipe(
          map((data) => ProductAction.loadProductSuccess({ product: data })),
          catchError((error: string) =>
            of(ProductAction.loadProductFailure({ error }))
          )
        );
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => ProductAction.updateProductSuccess({ product })),
          catchError((error) =>
            of(ProductAction.updateProductFailure({ error }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.createProduct),
      concatMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => ProductAction.createProductSuccess({ product })),
          catchError((error) =>
            of(ProductAction.createProductFailure({ error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.deleteProduct),
      concatMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          map(() => ProductAction.deleteProductSuccess()),
          tap(() => this.store.dispatch(ProductAction.loadProduct())),
          catchError((error) =>
            of(ProductAction.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

}