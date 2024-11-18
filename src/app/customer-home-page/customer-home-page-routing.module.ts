import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerHomePagePage } from './customer-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerHomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerHomePagePageRoutingModule {}
