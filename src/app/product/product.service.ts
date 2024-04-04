import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './IProduct';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  private selectedProductSource = new BehaviorSubject<Product | null>(null);
  selectedProductChanges$ = this.selectedProductSource.asObservable();

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred :${error.error.message}`;
    } else {
      errorMessage = `Server returned code :${error.status}, error message is: ${error.message}`;
    }

    console.error(errorMessage);

    return throwError(() => errorMessage);
  }

  changeSelectedProduct(selectedProduct: Product | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      // tap(data => console.log(JSON.stringify(data))),
      // tap(data => this.products = data),
      catchError(this.handleError)
    );
  }

  // Return an initialized product
  // newProduct(): Product {
  //   return {
  //     id: 0,
  //     productName: '',
  //     productCode: 'New',
  //     description: '',
  //     starRating: 0
  //   };
  // }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Product Id must be null for the Web API to assign an Id
    const newProduct = { ...product, id: null };
    return this.http
      .post<Product>(this.productsUrl, newProduct, { headers })
      .pipe(
        tap((data) => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers }).pipe(
      tap((data) => console.log('deleteProduct: ' + id)),
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;

    return this.http.put<Product>(url, product, { headers }).pipe(
      tap(() => console.log('updateProduct: ' + product.id)),
      // Update the item in the list
      // This is required because the selected product that was edited
      // was a copy of the item from the array.
      // tap(() => {
      //   const foundIndex = this.products?.findIndex(
      //     (item) => item.id === product.id
      //   );
      //   if (foundIndex > -1) {
      //     this.products[foundIndex] = product;
      //   }
      // }),
      // Return the product on an update
      map(() => product),
      catchError(this.handleError)
    );
  }
}
