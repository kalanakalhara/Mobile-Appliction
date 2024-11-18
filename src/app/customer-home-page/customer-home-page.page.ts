import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.page.html',
  styleUrls: ['./customer-home-page.page.scss'],
})
export class CustomerHomePagePage implements OnInit {
  userName: string = ''; // To display the user's name
  products: any[] = []; // Array to hold product details

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getUserDetails();
    this.fetchProducts();
  }

  getUserDetails() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.userName = user.name || 'User';
      }
    });
  }

  async fetchProducts() {
    const productCollection = collection(this.firestore, 'products');
    const productSnapshot = await getDocs(productCollection);
    this.products = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  addToCart(product: any) {
    this.cartService.addToCart(product).then(() => {
      console.log(`${product.name} added to cart`);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Logged out');
    });
  }
}
