import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { BekleyenPage } from '../bekleyen/bekleyen';
import { TamamlananPage } from '../tamamlanan/tamamlanan';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
	buttons: Array<{upper: string, lower: string, value: number, color: string, name: any}>;

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {
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
  		this.navCtrl.setRoot(button.name);
  }

}
