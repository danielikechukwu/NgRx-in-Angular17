import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../IProduct';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
// import { State } from '../../state/app.state';
import { getCurrentProduct, getShowProductCode } from '../product.selector';
import * as ProductAction from '../product.action';
import { State } from '../product.reducer';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage!: string;

  displayCode!: boolean;

  products!: Product[];

  // Used to highlight the selected product in the list
  selectedProduct!: Product | null;
  sub!: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    //Previous working code before implementing NGRX.
    //To check the selected product ID if they are same and make the button active.

    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   (currentProduct) => {
    //     this.selectedProduct = currentProduct;
    //   }
    // );

    this.sub = this.store
      .select(getCurrentProduct)
      .subscribe((value: Product | null) => {
        if (value) {
          this.selectedProduct = value;
        }
      });

    this.sub = this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });

    this.sub = this.store
      .select(getShowProductCode)
      .subscribe((value: boolean) => {
        this.displayCode = value;
      });
  }

  checkChanged(): void {
    //Previous working code before implementing NGRX.
    //To toggle button and display product code.

    // this.displayCode = !this.displayCode;

    this.store.dispatch(ProductAction.toggleProductCode());
  }

  newProduct(): void {
    //this.productService.changeSelectedProduct(this.productService.newProduct());

    this.store.dispatch(ProductAction.initCurrentProduct());
  }

  productSelected(product: Product): void {
    //Previous working code before implementing NGRX.
    // this.productService.changeSelectedProduct(product);

    this.store.dispatch(ProductAction.setCurrentProduct({ product }));
  }
}
