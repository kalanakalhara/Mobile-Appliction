import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userDetails: any = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private modalController: ModalController,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.loadUserDetails();
  }

  async loadUserDetails() {
    try {
      const user = this.auth.currentUser;
      if (user) {
        const userDocRef = doc(this.firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          this.userDetails = userDoc.data();
        } else {
          console.warn(
            'User document does not exist. Creating a new document...'
          );
          await setDoc(userDocRef, {
            name: user.displayName || 'New User',
            email: user.email || '',
            password: '', // Set an initial value
          });
          this.userDetails = {
            name: 'New User',
            email: user.email,
            password: '',
          };
        }
      } else {
        console.error('User not logged in');
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  }

  async updateDetails() {
    try {
      const user = this.auth.currentUser;
      if (user) {
        const userDocRef = doc(this.firestore, 'users', user.uid);
        await setDoc(userDocRef, this.userDetails, { merge: true });
        alert('User details updated successfully!');
        this.close();
      } else {
        alert('User not logged in');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  }

  close = async () => {
    const userprofile = await this.modalController.getTop();
    userprofile?.dismiss();
  };
}
