import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  loginInProgress = false;

  message: string | undefined;
  token: string | null | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  showPassword: boolean = false;
  constructor(private _snackBar: MatSnackBar,private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.loginInProgress = true; 
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Save tokens and user details in localStorage
        localStorage.setItem('access', response.access);
        this.loginInProgress = false; 
        // Navigate to products page
        this.router.navigate(['']);
      },
      error: (error) => {
        // Vérifiez si `details` existe dans l'objet `error`
        const errorDetails = error.error?.details?.detail || "Aucun compte actif n'a été trouvé avec les identifiants fournis";
        this.loginInProgress = false; 
        // Affichez le message d'erreur spécifique
        this.message = errorDetails;
        this.showErrorMessage = true;
  
        // Optionnel : Montrez une alerte d'erreur
        if (this.message) {
          this.showErrorAlert(this.message);
        }
  
        console.log('Error:', error); // Optionnel pour déboguer
      },
    });
  }

  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 5000, // Durée d'affichage de l'alerte (3 secondes)
    });
  }
}
