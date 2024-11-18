import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerHomePagePageRoutingModule } from './customer-home-page-routing.module';

import { CustomerHomePagePage } from './customer-home-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerHomePagePageRoutingModule
  ],
  declarations: [CustomerHomePagePage]
})
export class CustomerHomePagePageModule {}
