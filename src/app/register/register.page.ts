import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private router: Router, private auth: Auth) {}

  ngOnInit() {}

  async register() {
    if (!this.email || !this.password || !this.role || !this.username) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      console.log('User registered successfully:', userCredential);

      // Save user information (e.g., username and role) to Firestore
      // If needed, navigate to the home or login page
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
