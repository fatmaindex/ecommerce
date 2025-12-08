import { HttpClient, HttpParams } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IProduct } from "../models/IProduct";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  searchEmmeter = new EventEmitter<string>();
  constructor(private httpClient: HttpClient) {}

  // Get product by ID
  getProductByID(id: number): Observable<IProduct | undefined> {
  return this.httpClient.get<IProduct>(`${environment.apiUrl}/${id}`);
  }

  //get products by category or all products with pagination
  getProducts(
    searchQuery?: string,
    category?: string,
    sortOption?: string,
    page: number = 1,
    limit: number = 12
  ): Observable<any> {
    let params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());
    if (category && category !== "all") {
      params = params.set("category", category);
    }
    if (searchQuery) {
      params = params.set("search", searchQuery);
    }
     if (sortOption) {
      params = params.set("sort", sortOption);
    }
    return this.httpClient.get(environment.apiUrl, {
      params,
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
  }

  // search products by category or by title(name)
//   searchProducts(searchQuery: string): Observable<IProduct[]> {
//     //mesh fahma le da?
//     this.searchEmmeter.emit(searchQuery);
//     return this.httpClient.get<IProduct[]>( 
//        `${environment.apiUrl}/search`,
//     { params: { searchInput: searchQuery } }
//   );    
// }
}
