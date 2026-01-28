import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ShopComponent } from "./pages/shop/shop.component";
import { AboutComponent } from "./pages/about/about.component";
import { BlogComponent } from "./pages/blog/blog.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { CartComponent } from "./pages/cart/cart.component";
import { SingleProductComponent } from "./pages/single-product/single-product.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
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
