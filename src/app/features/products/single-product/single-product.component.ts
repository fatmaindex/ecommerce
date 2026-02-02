import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../../../shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})

export class SingleProductComponent implements OnInit {
  selectedPrd: Product | undefined;
  selectedPrdID: string | null = '';

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    public cartService: CartService,
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
  // onAddToCart(quantity: string) {
  //   if (!this.selectedPrd) return;

  //   const qty = parseInt(quantity);
  //   this.cartService.addToCart(this.selectedPrd.id, qty).subscribe({
  //     next: () => {
  //       this.snackBar.open("Added to cart successfully! 🛒", "Close", { duration: 2000 });
  //     },
  //     error: (err:any) => {
  //       if (err.status === 403) {
  //         this.snackBar.open("Please login first!", "Close", { duration: 3000 });
  //       }
  //     }
  //   });
  // }

  // ... باقي الكود كما هو ...

  onAddToCart(quantity: string) {
    if (!this.selectedPrd) return;

    const qty = parseInt(quantity) || 1; // تأمين لو الكمية مبعوتة غلط

    // نادى الفانكشن مباشرة بدون subscribe
    // وبنبعت الـ selectedPrd كله مش بس الـ ID
    this.cartService.addToCart(this.selectedPrd, qty);

    // بنطلع الـ SnackBar فوراً لأن السيرفس بتحدث الـ Subject في جزء من الثانية
    this.snackBar.open("Added to cart successfully! 🛒", "Close", { 
      duration: 2000,
      panelClass: ['success-snackbar'] // اختياري لشكل أحلى
    });
  }
}