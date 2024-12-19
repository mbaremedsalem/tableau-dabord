import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpassowrd',
  templateUrl: './resetpassowrd.component.html',
  styleUrls: ['./resetpassowrd.component.scss']
})
export class ResetpassowrdComponent {
  resetPasswordForm: FormGroup;
  token: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the token from the URL
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { password, confirmPassword } = this.resetPasswordForm.value;

      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.http
        .post(`http://127.0.0.1:8000/auth/reset_password/${this.token}`, { password, confirmPassword })
        .subscribe(
          (response: any) => {
            this.successMessage = 'Password reset successfully!';
            setTimeout(() => this.router.navigate(['/login']), 3000);
          },
          (error) => {
            this.errorMessage = error.error.error || 'An error occurred.';
          }
        );
    }
  }

}
