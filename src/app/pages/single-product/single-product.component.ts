import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/IProduct';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../viewModels/cartProduct';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
  selectedPrd!: IProduct;
  selectedPrdID: number = 0;

  constructor(private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {
  }
  ngOnInit(): void {
    // Subscribe to the route parameters to get the product ID from the URL
    // get the  selected product id sent from the productcard by param map
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.selectedPrdID = Number(paramMap.get('pid'))
    })
    // get product by id from products service 
    this.productsService.getProductByID(this.selectedPrdID).subscribe(
      (prd) => {
        if (prd) {
          this.selectedPrd = prd;
        } else {
          console.log('Product not found');
        }
      }
    );
  }
  //function to send the selected product to the cart service
  addToCart(quantity: string): void {
    if (this.selectedPrd) {
      let subTotal = this.selectedPrd.price * +quantity
      let cartPrd: cartProduct = {
        ...this.selectedPrd,
        quantity: Number(quantity),
        subTotal: subTotal
      }

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
          } } })
 }  }
}
