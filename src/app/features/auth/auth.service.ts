import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { environment } from "../../../environment/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem("accessToken");
    if (token) this.setUserFromToken(token);
  }

  // ----------------------------------------------------
  // ✅ الدالة المطلوبة للتحقق من حالة المستخدم (للاستخدام في الـ Guards)
  // ----------------------------------------------------
  public getUser(): any | null {
    // ترجع قيمة المستخدم الحالية المخزنة في الـ BehaviorSubject
    // هذا سيعيد null إذا لم يكن هناك مستخدم مسجل الدخول
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
      .post<{ accessToken: string; user: any }>(
        `${this.baseUrl}/auth/login`,
        credentials
      )
      .pipe(
        tap((res) => {
          localStorage.setItem("accessToken", res.accessToken);
          this.setUserFromToken(res.accessToken);
        })
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
