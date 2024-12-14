import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

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

  userDetails: any = {
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

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

  async createUserDocument(user: any) {
    try {
      const userDocRef = doc(this.firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef); // Fetch the user document first

      if (!userDoc.exists()) {
        // Check if the document exists
        console.warn(
          'User document does not exist. Creating a new document...'
        );
        await setDoc(userDocRef, {
          name: user.displayName || 'New User', // Default name if displayName is not set
          email: user.email || '', // Ensure email is always set
          password: '', // Placeholder (passwords should not be stored as plaintext)
        });
        this.userDetails = {
          name: user.displayName || 'New User',
          email: user.email,
          password: '',
        };
      } else {
        console.log('User document already exists.');
      }
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  }
}
