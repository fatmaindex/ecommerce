import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from './cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  private readonly API_URL = 'https://localhost:3000/api/cart'; 
  
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable(); 

  constructor(private http: HttpClient) {
    this.loadCart(); // تحميل السلة أول ما الموقع يفتح
  }

  // جلب البيانات من الـ API
  loadCart() {
    this.http.get<Cart>(this.API_URL).subscribe({
      next: (cart) => this.cartSubject.next(cart),
      error: (err) => console.error('Error loading cart', err)
    });
  }

  // في السيرفس - لازم نستخدم return ونشيل الـ subscribe من هنا
addToCart(productId: number, quantity: number) {
  return this.http.post<Cart>(this.API_URL, { productId, quantity }).pipe(
    tap((updatedCart) => {
      this.cartSubject.next(updatedCart);
    })
  );
}


  // مسح منتج
  removeItem(productId: string) {
    this.http.delete(`${this.API_URL}/${productId}`).subscribe(() => {
      this.loadCart();
    });
  }
}