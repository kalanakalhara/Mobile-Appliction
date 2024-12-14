import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditOrderComponent } from '../components/edit-order/edit-order.component';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {
  orders: any[] = [];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.loadAllOrders();
  }

  loadAllOrders() {
    const ordersCollection = collection(this.firestore, 'orders');
    onSnapshot(ordersCollection, (snapshot) => {
      this.orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  }

  async updateOrderStatus(orderId: string, status: string) {
    const orderDoc = doc(this.firestore, `orders/${orderId}`);
    await updateDoc(orderDoc, { status });
    console.log(`Order ${orderId} status updated to ${status}`);
  }

  openEditOrder = async (order: any) => {
    const editorder = await this.modalController.create({
      component: EditOrderComponent,
      cssClass: 'edit-order-popup-section',
      componentProps: { order },
      mode: 'md',
      canDismiss: true,
      backdropDismiss: true,
    });
    editorder.onDidDismiss().then(({ data }) => {
      if (data && data.updatedOrder) {
        // Update the order list with the new data
        const index = this.orders.findIndex(
          (o) => o.id === data.updatedOrder.id
        );
        if (index > -1) {
          this.orders[index] = data.updatedOrder;
        }
      }
    });
    await editorder.present();
    const { role, data } = await editorder.onDidDismiss();
  };

  navigateToAdminHome() {
    this.router.navigate(['/admin-home-page']);
  }
}
