import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../../../shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})

export class SingleProductComponent implements OnInit {
  selectedPrd: Product | undefined;
  selectedPrdID: string | null = '';

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    public cartService: CartService, // خليها public عشان نستخدمها في الـ HTML
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.selectedPrdID = paramMap.get('pid');
      
      if (this.selectedPrdID) {
        this.productsService.getProductByID(this.selectedPrdID).subscribe((prd) => {
          this.selectedPrd = prd;
        });
      }
    });
  }

  // 3. فانكشن الـ Add to Cart بالكمية المختارة
  onAddToCart(quantity: string) {
    if (!this.selectedPrd) return;

    const qty = parseInt(quantity);
    this.cartService.addToCart(this.selectedPrd.id, qty).subscribe({
      next: () => {
        this.snackBar.open("Added to cart successfully! 🛒", "Close", { duration: 2000 });
      },
      error: (err) => {
        if (err.status === 403) {
          this.snackBar.open("Please login first!", "Close", { duration: 3000 });
        }
      }
    });
  }
}