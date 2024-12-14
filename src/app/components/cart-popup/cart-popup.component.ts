import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from '../../service/auth.service';
import { addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss'],
})
export class CartPopupComponent implements OnInit {
  cartItems: any[] = [];
  userName: string = '';
  user: User | null = null;

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private auth: Auth,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartItems = this.cartService.cartItems;
  }

  async ngOnInit() {
    this.user = this.auth.currentUser; // Assign the current user to 'user'

    if (this.user) {
      this.userName =
        this.user.displayName || this.user.email?.split('@')[0] || 'Guest'; // Use display name or email
    }

    try {
      this.cartItems = await this.cartService.getCartItems(); // Fetch from Firestore
      this.cartService.cartItems = this.cartItems; // Sync with local state
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  }

  close = async () => {
    const opencart = await this.modalController.getTop();
    opencart?.dismiss();
  };

  async removeItem(itemId: any) {
    try {
      await this.cartService.removeFromCart(itemId); // Remove from Firestore
      this.cartService.removeItem(itemId); // Update local state
      this.cartItems = [...this.cartService.cartItems]; // Refresh local view
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  updateQuantity(itemId: number, newQuantity: number) {
    if (newQuantity < 1) return; // Prevent zero or negative quantities

    this.cartService.updateQuantity(itemId, newQuantity);
    // Optionally, sync changes with Firestore if needed
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  async checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Confirm checkout
    const confirmation = confirm('Are you sure you want to place this order?');
    if (!confirmation) {
      return;
    }

    try {
      // Fetch authenticated user details from AuthService
      const user = this.auth.currentUser;
      if (!user) {
        alert('You need to log in to place an order!');
        return;
      }

      // Prepare order details
      const order = {
        userId: user.uid,
        items: this.cartItems,
        total: this.getTotal(),
        date: new Date().toISOString(),
        status: 'process', // Default order status
      };

      // Save the order to Firestore
      await this.cartService.addOrder(order);

      // Clear the cart items from Firestore and local state
      await this.cartService.clearCart(); // Add this method if not yet implemented
      this.cartItems = [];

      // Optionally clear cart items from Firestore

      alert('Order placed successfully!');
      console.log('Order submitted:', order);

      // Optional: Redirect to a confirmation page
      this.router.navigate(['/orders-list']);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    }
  }
}
