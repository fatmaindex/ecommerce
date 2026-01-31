
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: any = null;

  constructor(private cartService: CartService) {}

 ngOnInit(): void {
  this.cartService.cart$.subscribe((data) => {
    this.cartData = data;
    console.log("Cart updated in UI:", data);
  });

  this.cartService.loadCart();
}

  onRemoveItem(productId: string) {
    if(confirm('Are you sure?')) {
      this.cartService.removeItem(productId);
    }
  }

}