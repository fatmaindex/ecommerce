import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: '', 
    loadChildren: () => import('./features/public/public.routes').then(r => r.PUBLIC_ROUTES) 
  },
  { 
    path: 'products', 
    loadChildren: () => import('./features/products/products.routes').then(r => r.PRODUCT_ROUTES) 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES) 
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./features/cart/cart/cart.component').then(c => c.CartComponent) 
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./features/profile/profile/profile.component').then(c => c.ProfileComponent) 
  },
  { path: '**', redirectTo: 'home' }
];