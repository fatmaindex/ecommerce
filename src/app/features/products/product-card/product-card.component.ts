import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  goToDetails() {
    console.log("Card Clicked! Navigating to ID:", this.product?.id);
    if (this.product?.id) {
      this.router.navigate(["/products", this.product.id]);
    } else {
      console.error("Product ID is missing!");
    }
  }

  onAddToCart(): void {
    this.cartService.addToCart(this.product, 1);
    this.snackBar.open(`${this.product.title} added to cart! 🛍️`, "Close", {
      duration: 2000,
      panelClass: ["custom-snackbar"],
    });
  }
}