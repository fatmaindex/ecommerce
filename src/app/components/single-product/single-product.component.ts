import { Component } from '@angular/core';
import { ProductsServiceService } from './../../services/products-service.service';
import { IProduct } from '../../models/IProduct';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../viewModels/cartProduct';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
  selectedPrd!: IProduct;
  selectedPrdID: number = 0;
  constructor(private productsService: ProductsServiceService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
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
      let subTotal= this.selectedPrd.price * +quantity
      let cartPrd: cartProduct = {
        ...this.selectedPrd,
        quantity: Number(quantity),
        subTotal:subTotal
      }
      this.cartService.addToCart(cartPrd)
    }
  }
}
