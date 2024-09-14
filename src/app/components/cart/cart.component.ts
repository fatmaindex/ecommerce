import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../viewModels/cartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  shownCartList: cartProduct[] = [];
  total: number = 0

  constructor(private cartService: CartService) {
    //bring the shown cartlist from the cart service
    this.shownCartList = this.cartService.carList
    this.total = this.cartService.TotalPrice()

  }

  // delete product from the cart list by its id
  deletePrd(prdId: number) {
    this.shownCartList = this.shownCartList.filter(product => product.id !== prdId)

    // update the cart in CartService as well
    this.cartService.carList = this.shownCartList;
    // update the total price after deleteing product
    this.total = this.cartService.TotalPrice()

    // decrese the cartproducts number by 1 after deleting cartproduct from the list
    this.cartService.productsNum = this.cartService.productsNum--
    this.cartService.NumEmitter.emit(this.cartService.productsNum)


  }

  updateQuantity(id: number, quantity: string) {
    this.cartService.carList.forEach(prd => {
      if (prd.id == id) {
        prd.quantity = Number(quantity)
        prd.subTotal = prd.price * prd.quantity
      }
    }
    )
    this.total = this.cartService.TotalPrice()
  }
}


