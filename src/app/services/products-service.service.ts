import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from './../../environment/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from './../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  searchEmmeter =new EventEmitter<string>()

  constructor(private httpClient: HttpClient) { }

  // Get all products
  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(environment.apiUrl);
  }
  // Get product by ID
  getProductByID(id: number): Observable<IProduct | undefined> {
    return this.httpClient.get<IProduct[]>(environment.apiUrl).pipe(
      map((products) => {
        return products.find((product) => product.id == id)
      })
    );
  }
  // get products by category or by title(name)
  getProductsByCatOrTitle(searchInputValue: string): Observable<IProduct[]> {
    this. searchEmmeter.emit(searchInputValue)
    return this.httpClient.get<IProduct[]>(environment.apiUrl).pipe(
      map((products) => products.filter((product) => product.category === searchInputValue ||product.title== searchInputValue))
    );

  }

}
