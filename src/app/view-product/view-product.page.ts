import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  products: any[] = [];

  constructor(
    private modalController: ModalController,
    private firestore: Firestore,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    const productCollection = collection(this.firestore, 'products');
    collectionData(productCollection, { idField: 'id' }).subscribe((data) => {
      this.products = data;
      console.log('Products:', this.products);
    });
  }

  async deleteProduct(productId: string, event: Event) {
    event.stopPropagation(); // Prevent the parent click event (e.g., openEditProduct)
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              const productDoc = doc(this.firestore, `products/${productId}`);
              await deleteDoc(productDoc);
              this.products = this.products.filter(
                (product) => product.id !== productId
              );
              console.log('Product deleted:', productId);
            } catch (error) {
              console.error('Error deleting product:', error);
              this.showAlert(
                'Error',
                'Failed to delete the product. Please try again.'
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Open Edit Product Page
  // openEditProduct(product: any) {
  //   console.log('Edit Product:', product);
  //   // Implement navigation to the edit product page and pass product details
  //   // Example: this.router.navigate(['/edit-product', { productId: product.id }]);
  // }

  // Show alert messages
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  openEditProduct = async (product: any) => {
    console.log('Edit Product:', product);
    const editproduct = await this.modalController.create({
      component: EditProductComponent,
      cssClass: 'edit-product-popup-section',
      componentProps: {
        product: product, // Pass the selected product
      },
      mode: 'md',
      canDismiss: true,
      backdropDismiss: true,
    });
    await editproduct.present();
    const { role, data } = await editproduct.onDidDismiss();
  };

  navigateToAdminHome() {
    this.router.navigate(['/admin-home-page']);
  }
}
