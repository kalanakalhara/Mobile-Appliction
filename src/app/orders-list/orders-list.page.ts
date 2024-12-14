import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  query,
  where,
  onSnapshot,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss'],
})
export class OrdersListPage implements OnInit {
  orders: any[] = [];

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  navigateToCustomerHomePage() {
    this.router.navigate(['/customer-home-page']);
  }

  loadOrders() {
    const user = this.auth.currentUser;
    if (!user) return;

    const ordersCollection = collection(this.firestore, 'orders');
    const userOrdersQuery = query(
      ordersCollection,
      where('userId', '==', user.uid)
    );

    // Listen for changes in the orders collection
    onSnapshot(userOrdersQuery, (snapshot) => {
      this.orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  }
}
