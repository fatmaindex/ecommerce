import { Injectable, EventEmitter } from '@angular/core';
import { cartProduct } from '../viewModels/cartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carList: cartProduct[] = [];
  productsNum: number = 0
  NumEmitter = new EventEmitter<number>();

  // function to add the resieved product (from single-product component) to the cartList array
  addToCart(product: cartProduct) {
    let existingProduct = this.carList.find(cartPrd => cartPrd.id == product.id)
    if (existingProduct) {

      // If the product already exists, update its quantity and subtotal
      existingProduct.quantity++
      existingProduct.subTotal = existingProduct.price * existingProduct.quantity;
    }
    else {
      this.carList.push(product);
      this.productsNum++
      this.NumEmitter.emit(this.productsNum)
      this.TotalPrice()
    }
  }
  TotalPrice() {
    let total: number = 0
    this.carList.forEach(product => total += product.subTotal)
    return total
  }
}
