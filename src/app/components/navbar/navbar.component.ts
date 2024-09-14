import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponet {
  cartProductsNum:number|null=null ;
  
  constructor(private cartService: CartService) {
    this.cartService.NumEmitter.subscribe((ProductsNum) => {
      this.cartProductsNum = ProductsNum;

    })
  }

}
