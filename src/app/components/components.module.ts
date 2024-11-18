import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product/edit-product.component';
import { IonicModule } from '@ionic/angular';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditProductComponent, EditOrderComponent],
  imports: [CommonModule, IonicModule.forRoot(), FormsModule],
  exports: [EditProductComponent, EditOrderComponent],
})
export class ComponentsModule {}
