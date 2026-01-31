// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     // if (this.auth.getUser()) return true;
//     this.router.navigate(['/login']);
//     return false;
//   }
// }


// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

// ------------------------------------------------------------------
// الدالة الجديدة (Functional Guard)
// ------------------------------------------------------------------
export const authGuard: CanActivateFn = (route, state) => {
  // 1. استخدام دالة inject() لجلب الخدمات (AuthService, Router)
  const authService = inject(AuthService);
  const router = inject(Router);

  // 2. منطق الحماية:
  // إذا كان لديك مستخدم موثق، اسمح بالوصول (return true)
  if (authService.getUser()) {
    return true;
  }

  // 3. إذا لم يكن هناك مستخدم، أعد توجيه المستخدم لصفحة الدخول (Login)
  router.navigate(['/login']);
  return false;
};