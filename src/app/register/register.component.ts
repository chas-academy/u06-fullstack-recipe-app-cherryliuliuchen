import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  responseMessage: string = '';
  isRegistered: boolean = false; // Control the ref message

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('https://u06-fullstack-recipe-app-cherryliuliuchen.onrender.com/api/register', {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation
      // Used to handle asynchronous operations in Angular
    }).subscribe({
      // The next function receives the response returned from the server and updates the component's state accordingly
      next: (response: any) => {
        if (response.user && response.token) {
          // If the response contains user and token, is registered 
          this.responseMessage = 'Registered successfully.';
          this.isRegistered = true; // To show the login ref
        } else {
          this.responseMessage = "Registration failed, please try again.";
        }
      },
      error: (error: any) => {
        this.responseMessage = "Registration failed, please try again.";
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']); // Navigate to login page
  }
}
