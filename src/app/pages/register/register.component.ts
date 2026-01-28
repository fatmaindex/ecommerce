import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.registerForm.invalid) return;
          console.log(this.registerForm.value)
    this.auth.register(this.registerForm.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => alert(err.error.message)
    });
  }
}
