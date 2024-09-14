import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environment/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from './../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor(private httpClient: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(environment.apiUrl);
  }

  // Get product by ID
  getProductByID(id: number): Observable<IProduct | undefined> {
    return this.httpClient.get<IProduct[]>(environment.apiUrl).pipe(
      map((products) =>{
        console.log(products)

        return products.find((product) => product.id == id)
      }
      
      )
    );
  }
}
