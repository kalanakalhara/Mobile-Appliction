import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  role: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async login() {
    if (!this.username || !this.password || !this.role) {
      // Alert if any field is empty
      this.showAlert('Error', 'All fields are required!');
      return;
    }

    try {
      // Attempt Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.username,
        this.password
      );

      // On successful login
      console.log('User signed in:', userCredential);

      // Navigate based on role
      if (this.role === 'admin') {
        this.router.navigate(['/admin-home-page']); // Adjust the route to match your admin dashboard
      } else if (this.role === 'customer') {
        this.router.navigate(['/customer-home-page']); // Adjust the route to match your customer home
      }
    } catch (error) {
      console.error('Login failed:', error);
      this.showAlert('Login Failed', 'Invalid username or password.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
