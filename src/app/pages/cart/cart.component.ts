// CartComponent
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { cartProduct } from './../../viewModels/cartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  shownCartList: cartProduct[] =[];
  total: number = 0;
  constructor(private cartService: CartService) {
    this.cartService.loadCart();
    this.shownCartList = this.cartService.carList;
    this.calculateTotal(); // Calculate total whenever cart changes
   }

  calculateTotal(): void {
    // Calculate total price of items in shownCartList
    const sum = this.shownCartList.reduce((acc, curr) => acc + curr.subTotal, 0);
    const factor = Math.pow(10, 3);
    this.total = Math.round(sum * factor) / factor;
  }
  //delete product from the cart by its id
  deleteProduct(prdID: number) {
    this.cartService.deleteProduct(prdID).subscribe({
      next: () => {
        // let updatedProductsNum = this.cartService.productsNum--;  // Update number of products
        // this.cartService.NumEmitter.emit(updatedProductsNum);  // Emit number of items for updates elsewhere

        this.shownCartList = this.shownCartList.filter(product => product.id !== prdID);
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      }
    });
  }
  // update quantity
  updateQuantity(quantity: string, cartPrd: cartProduct) {
    this.cartService.updateQuantity(quantity, cartPrd)
      .subscribe({
        next: (updatedPrd) => {
          this.cartService.loadCart();
        },
        error: (err) => {
          console.error('Error updating cart product', err);
        }
      });
  }

}
