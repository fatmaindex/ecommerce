import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CartService {
  private cartItems = new BehaviorSubject<any>(null);
  cart$ = this.cartItems.asObservable();

  private readonly API_URL = "https://localhost:3000/api/cart";

  constructor(private http: HttpClient) {}

  loadCart() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      this.http.get(this.API_URL).subscribe({
        next: (data) => this.cartItems.next(data),
        error: (err) => console.error("Server Cart Error", err),
      });
    } else {
      const localData = localStorage.getItem("guest_cart");
      this.cartItems.next(
        localData ? JSON.parse(localData) : { items: [], totalPrice: 0 }
      );
    }
  }

  addToCart(product: any, quantity: number = 1) {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const body = { productId: product.id, quantity };
      this.http.post(this.API_URL, body).subscribe({
        next: () => this.loadCart(),
        error: (err) => console.error("Error adding to server cart", err),
      });
    } else {
      let currentCart = this.cartItems.value || { items: [], totalPrice: 0 };
      
      const existingItem = currentCart.items.find(
        (item: any) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.subTotal = existingItem.quantity * existingItem.price;
      } else {
        currentCart.items.push({
          product: product,
          quantity: quantity,
          price: product.price || 0,
          subTotal: (product.price || 0) * quantity
        });
      }

      currentCart.totalPrice = currentCart.items.reduce((acc: number, item: any) => {
        return acc + (item.price * item.quantity);
      }, 0);

      localStorage.setItem("guest_cart", JSON.stringify(currentCart));
      this.cartItems.next({ ...currentCart });
    }
  }

  mergeCartAfterLogin(): Observable<any> {
    const guestCart = localStorage.getItem('guest_cart');
    const items = guestCart ? JSON.parse(guestCart).items : [];

    if (items && items.length > 0) {
      return this.http.post(`${this.API_URL}/merge`, { items }).pipe(
        tap(() => {
          localStorage.removeItem('guest_cart');
          this.loadCart();
        })
      );
    }
    return EMPTY;
  }

  removeItem(productId: any) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      this.http.delete(`${this.API_URL}/${productId}`).subscribe(() => this.loadCart());
    } else {
      let currentCart = this.cartItems.value || { items: [], totalPrice: 0 };
      currentCart.items = currentCart.items.filter((item: any) => item.product.id !== productId);
      currentCart.totalPrice = currentCart.items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
      localStorage.setItem("guest_cart", JSON.stringify(currentCart));
      this.cartItems.next({ ...currentCart });
    }
  }
}