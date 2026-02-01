import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { SingleProductComponent } from './single-product/single-product.component';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ShopComponent },
  { path: ':pid', component: SingleProductComponent },
];