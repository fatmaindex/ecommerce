import { Component } from '@angular/core';
import { ProductsServiceService } from './../../services/products-service.service';
import { IProduct } from './../../models/IProduct';
import { CartService } from './../../services/cart.service';
import { cartProduct } from '../../viewModels/cartProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: IProduct[] = [];
  // selectedPrd!: IProduct;

  constructor(private ProductsService: ProductsServiceService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.ProductsService.getAllProducts().subscribe((productsArr) => {
      this.products = productsArr;
    })
  }

  //function to send the selected product to the cart service
  addToCart(prd: IProduct): void {
    let cartPrd = { ...prd, quantity: 1, subTotal: (prd.price * 1) }
    this.cartService.addToCart(cartPrd)
  }
}


