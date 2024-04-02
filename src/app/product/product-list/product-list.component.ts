import { Component, OnInit } from '@angular/core';
import { Product } from '../IProduct';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  getCurrentProduct,
  getProducts,
  getShowProductCode,
} from '../product.selector';
import * as ProductAction from '../product.action';
import { State } from '../product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})

export class ProductListComponent implements OnInit {

  pageTitle = 'Products';

  errorMessage!: string;

  displayCode$!: Observable<boolean>;

  products$!: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct$!: Observable<Product | null>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {

    this.selectedProduct$ = this.store.select(getCurrentProduct)

    this.store.dispatch(ProductAction.loadProduct());

    this.products$ = this.store.select(getProducts)

    this.displayCode$ = this.store.select(getShowProductCode);

  }

  checkChanged(): void {
    this.store.dispatch(ProductAction.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductAction.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductAction.setCurrentProduct({ product }));
  }

}
