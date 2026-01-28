import { Component, Input } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { IProduct } from "./../../models/IProduct";
import { CartService } from "./../../services/cart.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  @Input() shownProducts: IProduct[] = [];

  constructor(
    private ProductsService: ProductsService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  // function to send the selected product to the cart service
  addToCart(prd: IProduct): void {
    let cartPrd = { ...prd, quantity: 1, subTotal: prd.price * 1 };
    this.cartService.addToCart(cartPrd).subscribe({
      next: (cartProduct) => {
        //check if the product oredy in the cartlist or not
        let existingProduct = this.cartService.carList.find((prd) => {
          return prd.id == cartPrd.id;
        });
        if (existingProduct) {
          // Update the quantity if the product already exists in the cart
          existingProduct.quantity++;
          existingProduct.subTotal =
            existingProduct.price * existingProduct.quantity;

          // Show the snackbar notification
          this.snackBar.open("Product added to cart!", "Close", {
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["custom-snackbar"],
          });
        } else {
          this.cartService.carList.push(cartProduct);
          // Show the snackbar notification
          this.snackBar.open("Product added to cart!", "Close", {
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top",
            panelClass: ["custom-snackbar"],
          });
        }
      },
      error: (err) => {
        console.log("Error adding product to cart", err);
        // Show error snackbar
        this.snackBar.open("Error adding product to cart", "Close", {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: ["custom-snackbar"],
        });
      },
    });
  }
}
