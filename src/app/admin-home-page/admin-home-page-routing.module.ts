import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomePagePage } from './admin-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomePagePageRoutingModule {}
