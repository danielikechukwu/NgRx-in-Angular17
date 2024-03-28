import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-shell',
  standalone: true,
  imports: [ProductListComponent, ProductEditComponent],
  templateUrl: './product-shell.component.html',
  styleUrl: './product-shell.component.css'
})
export class ProductShellComponent implements OnInit, OnDestroy {

  constructor(){

  }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {

  }
}
