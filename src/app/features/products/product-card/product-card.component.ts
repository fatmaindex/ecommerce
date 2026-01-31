import { Component, Input } from '@angular/core';
import { Product} from '../../../shared/models/product.model';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  // bsta2pel el product men el perant
  @Input() product!: Product; 

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private Router: Router
  ) {}


  goToDetails() {
  this.Router.navigate(['/singleProduct', this.product?.id]);
}
  onAddToCart(): void {
    this.cartService.addToCart(this.product.id, 1).subscribe({
      next: () => this.showSnackbar("Product added to cart! 🛍️"),
      error: (err: any) => this.showSnackbar("Error adding product", true)
    });
  }

  private showSnackbar(message: string, isError: boolean = false): void {
    this.snackBar.open(message, "Close", {
      duration: 2000,
      panelClass: isError ? ["error-snackbar"] : ["custom-snackbar"],
    });
  }
}