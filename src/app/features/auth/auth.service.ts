import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { environment } from "../../../environment/environment";
import { CartService } from "../cart/cart.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) {
    const token = localStorage.getItem("accessToken");
    if (token) this.setUserFromToken(token);
  }

  public getUser(): any | null {
    return this.currentUserSubject.value;
  }
  private setUserFromToken(token: string) {
    const decoded: any = jwtDecode(token);
    this.currentUserSubject.next({
      id: decoded.sub,
      role: decoded.role,
      token,
    });
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<{
        accessToken: string;
        user: any;
      }>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem("accessToken", res.accessToken);
          this.setUserFromToken(res.accessToken);
             // أهم خطوة: تشغيل الدمج فوراً
          this.cartService.mergeCartAfterLogin().subscribe({
            next: () => console.log("Cart Merged Successfully"),
            error: (err:any) => console.error("Merge Error:", err)
          });
        }),
      );
  }

  register(userData: {
    name: string;
    username: string;
    email: string;
    mobileNumber: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  logout() {
    localStorage.removeItem("accessToken");
    this.currentUserSubject.next(null);
  }

  get isAdmin(): boolean {
    return this.currentUserSubject.value?.role === "admin";
  }
}

