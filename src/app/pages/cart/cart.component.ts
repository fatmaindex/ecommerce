
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: any = null;

  constructor(private cartService: CartService) {}

 ngOnInit(): void {
  // 1. اشتركي في الـ Observable عشان أي تغيير يحصل (حذف/إضافة) يغير الـ UI فوراً
  this.cartService.cart$.subscribe((data) => {
    this.cartData = data;
    console.log("Cart updated in UI:", data);
  });

  // 2. اطلبي من السيرفر أحدث بيانات أول ما الصفحة تفتح
  this.cartService.loadCart();
}

  onRemoveItem(productId: string) {
    if(confirm('Are you sure?')) {
      this.cartService.removeItem(productId);
    }
  }

}