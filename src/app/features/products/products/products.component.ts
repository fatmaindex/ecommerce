import { Component, Input } from "@angular/core";
import { Product } from "../../../shared/models/product.model";
import { CartService } from "../../cart/cart.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CommonModule } from "@angular/common";
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent,MatSnackBarModule],
  templateUrl: "./products.component.html",
  styleUrl:"./products.component.scss"
})
// export class ProductsComponent {
//   @Input() shownProducts: Product[] = [];

//   constructor(
//     private cartService: CartService,
//     private snackBar: MatSnackBar
//   ) {}

//   addToCart(prd: Product): void {

//     this.cartService.addToCart(prd.id, 1).subscribe({
//       next: () => {
        
//         this.showSnackbar("Product added to cart! 🛍️");
//       },
//       error: (err: any) => {
//         console.error("Error adding product to cart", err);
//         this.showSnackbar("Error adding product to cart", true);
//       },
//     });
//   }

//  // method mosa3da 3shan code el snakbar mytkrarsh
//   private showSnackbar(message: string, isError: boolean = false): void {
//     this.snackBar.open(message, "Close", {
//       duration: 2000,
//       horizontalPosition: "center",
//       verticalPosition: "top",
//       panelClass: isError ? ["error-snackbar"] : ["custom-snackbar"],
//     });
//   }
// }

export class ProductsComponent {
  @Input() shownProducts: Product[] = [];

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  addToCart(prd: Product): void {

    this.cartService.addToCart(prd, 1);

    // 3. بنظهر الـ Snackbar فوراً
    this.showSnackbar(`${prd.title} added to cart! 🛍️`);
    
    // ملاحظة: لو عايزة تتأكدي إن الإضافة حصلت، السيرفس هي اللي مسؤولة 
    // عن تحديث الـ BehaviorSubject اللي السلة كلها بتسمع منه.
  }

  private showSnackbar(message: string, isError: boolean = false): void {
    this.snackBar.open(message, "Close", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ["error-snackbar"] : ["custom-snackbar"],
    });
  }
}