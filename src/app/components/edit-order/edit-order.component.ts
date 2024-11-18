import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  close = async () => {
    const editorder = await this.modalController.getTop();
    editorder?.dismiss();
  };
}
