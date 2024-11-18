import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  productName: string = '';
  productPrice: string = '';
  productDescription: string = '';
  productCategory: string = '';

  constructor(
    private firestore: Firestore,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async addProduct(event: Event) {
    event.preventDefault(); // Prevent form submission reloading the page

    if (
      !this.productName ||
      !this.productPrice ||
      !this.productDescription ||
      !this.productCategory
    ) {
      this.showAlert('Error', 'All fields are required!');
      return;
    }

    try {
      const productCollection = collection(this.firestore, 'products');
      await addDoc(productCollection, {
        name: this.productName,
        price: parseFloat(this.productPrice),
        description: this.productDescription,
        category: this.productCategory,
        createdAt: new Date(),
      });

      this.showAlert('Success', 'Product added successfully!');
      this.resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
      this.showAlert('Error', 'Failed to add the product. Please try again.');
    }
  }

  resetForm() {
    this.productName = '';
    this.productPrice = '';
    this.productDescription = '';
    this.productCategory = '';
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  navigateToAdminHome() {
    this.router.navigate(['/admin-home-page']);
  }
}
