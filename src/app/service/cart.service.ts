import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCollectionName = 'carts';

  constructor(private firestore: Firestore, private auth: Auth) {}

  // Add a product to the cart
  async addToCart(product: any): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('User not logged in');

    const cartCollection = collection(this.firestore, this.cartCollectionName);
    await addDoc(cartCollection, {
      userId: user.uid,
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  // Fetch all cart items for the logged-in user
  async getCartItems(): Promise<any[]> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('User not logged in');

    const cartCollection = collection(this.firestore, this.cartCollectionName);
    const snapshot = await getDocs(cartCollection);

    // Map the documents to include their ID and data
    return snapshot.docs
      .map((doc) => {
        const data = doc.data() as {
          userId: string;
          productId: string;
          productName: string;
          price: number;
          quantity: number;
        }; // Explicitly define the expected structure
        return { id: doc.id, ...data };
      })
      .filter((item) => item.userId === user.uid); // Filter based on the logged-in user's UID
  }

  // Remove an item from the cart
  async removeFromCart(cartItemId: string): Promise<void> {
    const cartDoc = doc(
      this.firestore,
      `${this.cartCollectionName}/${cartItemId}`
    );
    await deleteDoc(cartDoc);
  }
}
