import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { ModalController } from '@ionic/angular';
import { CartPopupComponent } from '../components/cart-popup/cart-popup.component';
import { Route, Router } from '@angular/router';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';

@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.page.html',
  styleUrls: ['./customer-home-page.page.scss'],
})
export class CustomerHomePagePage implements OnInit {
  userName: string = ''; // To display the user's name
  products: any[] = []; // Array to hold product details
  filteredProducts: any[] = []; // Array to hold filtered product details
  searchQuery: string = ''; // Holds the current search query

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private cartService: CartService,
    private modalController: ModalController,
    private router: Router
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
    this.filteredProducts = this.products;
  }

  filterProducts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  addToCart(product: any) {
    this.cartService
      .addToCart(product)
      .then(async () => {
        console.log(`${product.name} added to cart`);
        this.cartService.addItem(product); // Update local cart items
      })
      .catch((error) => {
        console.error('Failed to add product to cart:', error);
      });
  }

  openCart = async () => {
    const opencart = await this.modalController.create({
      component: CartPopupComponent,
      cssClass: 'cart-popup-section',

      mode: 'md',
      canDismiss: true,
      backdropDismiss: true,
    });
    await opencart.present();
    const { role, data } = await opencart.onDidDismiss();
  };

  openUserProfile = async () => {
    const userprofile = await this.modalController.create({
      component: UserProfileComponent,
      cssClass: 'userProfile-popup-section',

      mode: 'md',
      canDismiss: true,
      backdropDismiss: true,
    });
    await userprofile.present();
    const { role, data } = await userprofile.onDidDismiss();
  };

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Logged out');
      })
      .catch((error) => {
        console.error('Logout error:', error); // Log any error that occurs during logout
      });
  }

  navigateToOrderListPage() {
    this.router.navigate(['/orders-list']);
  }
}
