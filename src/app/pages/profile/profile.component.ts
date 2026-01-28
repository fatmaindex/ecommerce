import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.scss']

})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(this.user);

    this.loadProfile();
  }
  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error("Failed to load profile", err);
      },
    });
  }

  logout() {
    this.authService.logout();
    window.location.href = "/login";
  }
}
