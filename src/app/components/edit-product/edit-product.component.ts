import { Component, Input, OnInit } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  @Input() product: any;

  constructor(
    private modalController: ModalController,
    private firestore: Firestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  close = async () => {
    const editproduct = await this.modalController.getTop();
    editproduct?.dismiss();
  };

  async updateProduct() {
    try {
      const productDoc = doc(this.firestore, `products/${this.product.id}`);
      await updateDoc(productDoc, {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        category: this.product.category,
      });

      // Show success message
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Product updated successfully!',
        buttons: ['OK'],
      });
      await alert.present();

      this.close(); // Close the popup after updating
    } catch (error) {
      console.error('Error updating product:', error);

      // Show error message
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to update product. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
