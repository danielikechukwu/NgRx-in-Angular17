import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './product/product.service';
import * as ProductAction from './product/product.action';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { Product } from './product/IProduct';

@Injectable()
export class AppEffects {
  
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadProduct),
      mergeMap(() => {
        return this.productService.getProducts().pipe(
          map((data) => ProductAction.loadProductSuccess({ product: data })),
          catchError((error: string) => of(ProductAction.loadProductFailure({ error })))
        )
      }

      )
    )
  );
}
