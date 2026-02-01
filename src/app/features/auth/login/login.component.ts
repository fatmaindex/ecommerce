import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterModule,MatSnackBarModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

constructor(
  private fb: FormBuilder, 
  private auth: AuthService, 
  private router: Router,
  private snackBar: MatSnackBar 
) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

submit(): void {
  if (this.loginForm.invalid) return;
  
  this.auth.login(this.loginForm.value).subscribe({
    next: (res:any) => {
      this.snackBar.open("Login Successful! Welcome back 🔥", "Close", { duration: 3000 });
      
      this.router.navigate(['/profile']); 
    },
    error: (err:any) => {
      this.snackBar.open(err.error?.message || "Login Failed!", "Close", { 
        duration: 3000,
        panelClass: ['error-snackbar'] 
      });
    }
  });
}}