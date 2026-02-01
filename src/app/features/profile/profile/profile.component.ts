import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { UserService } from "../../profile/user.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (res: any) => {
        this.user = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error("Failed to load profile", err);
        this.isLoading = false;
        if (err.status === 401) {
          this.logout();
        }
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
