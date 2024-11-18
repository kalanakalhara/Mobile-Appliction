import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditOrderComponent } from '../components/edit-order/edit-order.component';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  openEditOrder = async () => {
    const editorder = await this.modalController.create({
      component: EditOrderComponent,
      cssClass: 'edit-order-popup-section',

      mode: 'md',
      canDismiss: true,
      backdropDismiss: true,
    });
    await editorder.present();
    const { role, data } = await editorder.onDidDismiss();
  };
}
