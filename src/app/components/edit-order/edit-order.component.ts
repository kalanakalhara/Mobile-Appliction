import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  @Input() order: any;

  constructor(
    private modalController: ModalController,
    private firestore: Firestore
  ) {}

  ngOnInit() {}

  close = async () => {
    const editorder = await this.modalController.getTop();
    editorder?.dismiss();
  };

  increaseQuantity(item: any) {
    item.quantity += 1;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  calculateTotal(): number {
    return this.order.items.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );
  }

  async updateOrder() {
    try {
      const orderDocRef = doc(this.firestore, `orders/${this.order.id}`);
      const updatedOrder = {
        ...this.order,
        total: this.calculateTotal(), // Update the total price
      };

      await updateDoc(orderDocRef, updatedOrder);

      alert('Order updated successfully!');
      this.modalController.dismiss({ updatedOrder }); // Pass updated order back
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order. Please try again.');
    }
  }
}
