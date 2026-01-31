// modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';

// ------------------------------
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
// ----------------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
// تم حذف استيراد الكلاس TokenInterceptor واستبداله باستيراد الدالة
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor'; // ✅ استيراد الدالة الجديدة

// components
import { AppComponent } from './app.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { FeaturesComponent } from './shared/components/features/features.component';
import { BannersComponent } from './shared/components/banners/banners.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ProductsComponent } from './features/products/products/products.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NewsLettersComponent } from './shared/components/news-letters/news-letters.component';
// pages
import { HomeComponent } from './features/public/home/home.component';
import { ShopComponent } from './features/products/shop/shop.component';
import { AboutComponent } from './features/public/about/about.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { ContactComponent } from './features/public/contact/contact.component';
import { CartComponent } from './features/cart/cart/cart.component';
import { SingleProductComponent } from './features/products/single-product/single-product.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FilterBarComponent } from './features/products/filter-bar/filter-bar.component';
import { PaginationComponent } from './features/products/pagination/pagination.component';
import { SearchBarComponent } from './features/products/search-bar/search-bar.component';
import { ProfileComponent } from './features/profile/profile/profile.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProductCardComponent } from './features/products/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    FeaturesComponent,
    BannersComponent,
    NewsLettersComponent,
    FooterComponent,
    ProductsComponent,
    NavbarComponent,
    HomeComponent,
    ShopComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    CartComponent,
    SingleProductComponent,
    FilterBarComponent,
    PaginationComponent,
    SearchBarComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    // 🎯 هنا التعديل الرئيسي: استخدام الدالة tokenInterceptor مباشرة
    provideHttpClient(
      withInterceptors([
        tokenInterceptor // ✅ تمرير الدالة هنا
      ])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }