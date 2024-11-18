import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminHomePagePageRoutingModule } from './admin-home-page-routing.module';

import { AdminHomePagePage } from './admin-home-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminHomePagePageRoutingModule
  ],
  declarations: [AdminHomePagePage]
})
export class AdminHomePagePageModule {}
