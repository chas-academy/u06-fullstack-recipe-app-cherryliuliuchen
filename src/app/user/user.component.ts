import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // import router service

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  token: string = '';
  responseMessage: string = '';
  user: any = null;

  constructor(private http: HttpClient, private router: Router) {} // Import router service

  login() {
    this.http.post('https://u06-fullstack-recipe-app-cherryliuliuchen.onrender.com/api/login', {
      email: this.loginEmail,
      password: this.loginPassword,
    }).subscribe({
      next: (response: any) => {
        if (response.user && response.token) {
          this.token = response.token;
          this.user = response.user;
          this.responseMessage = "Logged in successfully";
        } else {
          this.responseMessage = "Login failed, please try again";
        }
      },
      error: (error: any) => {
        this.responseMessage = "Login failed, please try again";
      }
    });
  }

  logout() {
    this.http.post('https://u06-fullstack-recipe-app-cherryliuliuchen.onrender.com/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: (response: any) => {
        if (response.message === "logged out") {
          this.responseMessage = "Logged out successfully. Welcome to our website again";
        } else {
          this.responseMessage = "Logged out failed, please try again";
        }
        this.token = '';
        this.user = null;
      },
      error: (error: any) => {
        this.responseMessage = "Log out failed, please try again";
      }
    });
  }
  
  goToRegister() {
    this.router.navigate(['/register']); // User Router service to navigate
  }
}
