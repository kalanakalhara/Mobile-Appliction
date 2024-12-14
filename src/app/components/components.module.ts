import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product/edit-product.component';
import { IonicModule } from '@ionic/angular';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { FormsModule } from '@angular/forms';
import { CartPopupComponent } from './cart-popup/cart-popup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    EditProductComponent,
    EditOrderComponent,
    CartPopupComponent,
    UserProfileComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot(), FormsModule],
  exports: [
    EditProductComponent,
    EditOrderComponent,
    CartPopupComponent,
    UserProfileComponent,
  ],
})
export class ComponentsModule {}
