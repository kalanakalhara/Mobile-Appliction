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
  cartItems: any[] = [];

  constructor(private firestore: Firestore, private auth: Auth) {}

  async addToCart(product: any): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      console.error('User not logged in');
      throw new Error('User not logged in');
    }

    const cartCollection = collection(this.firestore, this.cartCollectionName);
    try {
      await addDoc(cartCollection, {
        userId: user.uid,
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
      });
      console.log(`${product.name} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  addItem(item: any) {
    const existingItem = this.cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
  }

  updateQuantity(itemId: number, quantity: number) {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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

  async addOrder(order: any): Promise<void> {
    const ordersCollection = collection(this.firestore, 'orders');
    try {
      await addDoc(ordersCollection, order);
      console.log('Order successfully placed:', order);
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }

  async clearCart(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User not logged in');
    }

    try {
      const cartCollection = collection(
        this.firestore,
        this.cartCollectionName
      );
      const snapshot = await getDocs(cartCollection);

      // Filter and delete cart items for the current user
      const userCartItems = snapshot.docs.filter(
        (doc) => doc.data()['userId'] === user.uid // Use bracket notation here
      );

      const deletePromises = userCartItems.map((doc) => deleteDoc(doc.ref));

      await Promise.all(deletePromises); // Wait for all deletions
      this.cartItems = []; // Clear the local cart items array
      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}
