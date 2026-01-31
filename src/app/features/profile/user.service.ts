import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProfile() {
    console.log("sccesstoken",localStorage.getItem("accessToken"));
    return this.http.get(`${this.apiUrl}/users/me`);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.apiUrl}/users/update`, data);
  }
}
