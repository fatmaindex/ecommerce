import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { SingleProductComponent } from './components/single-product/single-product.component';

const routes: Routes = [
  {path:'' ,redirectTo:'/home', pathMatch:'full'},
  {path:'home' ,component:HomeComponent},
  {path:'shop' ,component:ShopComponent},
  {path:'about', component:AboutComponent},
  {path:'blog' ,component:BlogComponent},
  {path:'contact' ,component:ContactComponent},
  {path:'cart' ,component:CartComponent},
  {path:'singleProduct/:pid', component:SingleProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
