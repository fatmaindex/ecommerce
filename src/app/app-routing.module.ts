import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./features/public/home/home.component";
import { ShopComponent } from "./features/products/shop/shop.component";
import { AboutComponent } from "./features/public/about/about.component";
import { BlogComponent } from "./features/public/blog/blog.component";
import { ContactComponent } from "./features/public/contact/contact.component";
import { CartComponent } from "./features/cart/cart/cart.component";
import { SingleProductComponent } from "./features/products/single-product/single-product.component";
import { ProfileComponent } from "./features/profile/profile/profile.component";
import { RegisterComponent } from "./features/auth/register/register.component";
import { LoginComponent } from "./features/auth/login/login.component";
// import { LoginComponent } from "./pages/login/login.component";
// import { ProfileComponent } from "./pages/profile/profile.component";
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "shop", component: ShopComponent },
  { path: "about", component: AboutComponent },
  { path: "blog", component: BlogComponent },
  { path: "contact", component: ContactComponent },
  { path: "cart", component: CartComponent },
  { path: "singleProduct/:pid", component: SingleProductComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
