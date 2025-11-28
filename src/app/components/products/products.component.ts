import { Component } from '@angular/core';
import { ProductsServiceService } from './../../services/products-service.service';
import { IProduct } from './../../models/IProduct';
import { CartService } from './../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  shownProducts: IProduct[] = []
  filteredProcuts: IProduct[] = []
  sentSearchInputValue!: string

  constructor(private ProductsService: ProductsServiceService,
    private cartService: CartService
  ,    private snackBar: MatSnackBar
) {
    //subscire to category emmiter to get the category name from the home componets to the products component
    this.ProductsService.searchEmmeter.subscribe((searchInputValue) => {
      this.sentSearchInputValue = searchInputValue;
      this.getProductsByCatOrTitle(); // Fetch products by category

    })
  }
  ngOnInit(): void {
    this.ProductsService.getAllProducts().subscribe((productsArr) => {
      this.shownProducts = productsArr;
    })
  }
  //function to send the selected product to the cart service
  addToCart(prd: IProduct): void {

    let cartPrd = { ...prd, quantity: 1, subTotal: (prd.price * 1) }
    this.cartService.addToCart(cartPrd).subscribe({
      next: (cartProduct) => {
        //check if the product oredy in the cartlist or not
        let existingProduct = this.cartService.carList.find((prd) => { return prd.id == cartPrd.id })
        if (existingProduct) {
          // Update the quantity if the product already exists in the cart
          existingProduct.quantity++;
          existingProduct.subTotal = existingProduct.price * existingProduct.quantity;

          // Show the snackbar notification
          this.snackBar.open('Product added to cart!', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });

        }

        else {
          this.cartService.carList.push(cartProduct)

          // Show the snackbar notification
          this.snackBar.open('Product added to cart!', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });
        }
      },
      error: (err) => {
        console.log('Error adding product to cart', err);
        // Show error snackbar
        this.snackBar.open('Error adding product to cart', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']

        });
      }}  )  }
  // ----------------------
  getProductsByCatOrTitle() {
    this.ProductsService.getProductsByCatOrTitle(this.sentSearchInputValue).subscribe(
      {
        next: (Products) => {
          this.filteredProcuts = Products
          this.shownProducts = this.filteredProcuts
        }
      } 
    )  }}


