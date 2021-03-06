import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

import { BekleyenPage } from '../bekleyen/bekleyen';
import { TamamlananPage } from '../tamamlanan/tamamlanan';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
	buttons: Array<{upper: string, lower: string, value: number, color: string, name: any}>;

  constructor(public global: GlobalProvider, public menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.getValues();
  	this.menu.swipeEnable(true);
  	this.buttons = [
  		{upper: 'Bekleyen', lower: 'Arızalar', value:0, color:'blue', name: BekleyenPage},
  		{upper: 'Tamamlanan', lower: 'Arızalar', value:0, color:'green', name: TamamlananPage},
  		{upper: '0 - 24 saat', lower: 'SLA', value:0, color:'orange', name: ''},
  		{upper: '24 - 48 saat', lower: 'SLA', value:0, color:'kiremit', name: ''},
  		{upper: '48 - 72 saat', lower: 'SLA', value:0, color:'red', name: ''},
  		{upper: '72 saat ve', lower: 'sonrası SLA', value:0, color:'kuruuzum', name: ''}
  	];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(button) {
  	if(button.name != '')
  		this.navCtrl.push(button.name);
  }

  getValues() {
    this.global.getData('/ariza?sorgu=sayi&durum=tumu')
    .then(data => {
      this.buttons[0].value = data["bekleyen"];
      this.buttons[1].value = data["tamamlanan"];
      this.buttons[2].value = data["sifirYirmiDort"];
      this.buttons[3].value = data["yirmiDortKirkSekiz"];
      this.buttons[4].value = data["kirkSekizYetmisIki"];
      this.buttons[5].value = data["yetmisIkiveSonrasi"];
    });
  }

}
