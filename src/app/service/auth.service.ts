import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface CustomUser {
  uid: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.initAuthListener();
  }

  // Initialize listener for authentication state
  private initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  // Sign in with email and password
  login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (credentials) => {
        this.userSubject.next(credentials.user);
        return credentials.user;
      }
    );
  }

  // Get user details from Firestore (CustomUser)
  getUser(): Observable<CustomUser | null> {
    return new Observable((observer) => {
      const user = this.auth.currentUser;
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data() as CustomUser;
              observer.next(data); // Emit the user data
            } else {
              observer.next(null); // No user found in Firestore
            }
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      } else {
        observer.next(null); // No authenticated user
        observer.complete();
      }
    });
  }

  // Logout the user
  async logout() {
    try {
      await signOut(this.auth); // Firebase sign out method
      console.log('User signed out');
      this.router.navigate(['/login']); // Navigate to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
