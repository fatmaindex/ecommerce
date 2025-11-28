import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable, reduce } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { cartProduct } from './../viewModels/cartProduct';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  carList: cartProduct[]=[] ;
  cartProductsNum:number|null=null;
  cartProductsNumSubject = new BehaviorSubject<number|null>(null)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private httpClient: HttpClient) { 
    this.loadCart()
  }
  // add the resieved product (from single-product component) to the cart enpoint
  addToCart(product: cartProduct): Observable<cartProduct> {
    let existingProduct = this.carList.find((prd) => { return prd.id == product.id })
    if (existingProduct) {
      // Update the quantity if the product already exists in the cart
      existingProduct.quantity++;
      existingProduct.subTotal = existingProduct.price * existingProduct.quantity;
      // Safely increment cart count
      this.cartProductsNum=(this.cartProductsNum??0)+1
      this.cartProductsNumSubject.next(this.cartProductsNum)
      // Update the product quantity on the cart enpoint
      return this.httpClient.put<cartProduct>(`${environment.cartURL}/${existingProduct.id}`, existingProduct, this.httpOptions)
    }
    else {
      // Safely increment cart count
      this.cartProductsNum=(this.cartProductsNum??0)+product.quantity
      this.cartProductsNumSubject.next(this.cartProductsNum)    
        return this.httpClient.post<cartProduct>(environment.cartURL, product, this.httpOptions)
    }
  }
  //get the products from cart endpoint
  getCart(): Observable<cartProduct[]> {
    return this.httpClient.get<cartProduct[]>(environment.cartURL);
  }
  // Store fetched cart products in the cartlist array in the local service
  loadCart(): void{
    this.getCart().subscribe((cartProducts) => {
      this.carList = cartProducts;
      this.cartProductsNum = cartProducts.reduce((acc,product)=>acc+product.quantity ,0);  // Update number of products
    });
   this.cartProductsNum= this.carList.reduce((acc,product)=>acc+product.quantity,0)
    this.cartProductsNumSubject.next(this.cartProductsNum)
  }
  // delete product from the cart endpoint
  deleteProduct(id: number): Observable<void> {
     // Safely decrement cart count
    this.cartProductsNum=(this.cartProductsNum??0)-1
      this.cartProductsNumSubject.next(this.cartProductsNum)

    let cartURL = `${environment.cartURL}/${id}`;
    return this.httpClient.delete<void>(cartURL, this.httpOptions)
  }
  // updte quantity
  updateQuantity(quantity: string, cartPrd: cartProduct): Observable<any> {
    cartPrd.quantity = Number(quantity);
    cartPrd.subTotal = Number(quantity) * cartPrd.price
    return this.httpClient.put(`${environment.cartURL}/${cartPrd.id}`, cartPrd, this.httpOptions)
  }

}



