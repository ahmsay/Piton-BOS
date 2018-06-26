import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-onarım',
  templateUrl: 'onarım.html',
})
export class OnarımPage {
	contents: Array<{category: string, selections: string[], choosed: string}>;
	explanation: string;

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
  	this.contents = [
  	{category: 'Arıza Durumu', selections: ['Arıza Durumu Seçiniz', 'Yeni', 'Çalışmaya Devam Ediyor'], choosed: 'Arıza Durumu Seçiniz'},
  	{category: 'Arıza Türü', selections: ['Arıza Türü Seçiniz', '12v SMPS', '24v SMPS'], choosed: 'Arıza Türü Seçiniz'},
  	{category: 'Arıza Çözüm', selections: ['Arıza Çözümü Seçiniz', '3G Modem Devreye Alındı', 'Elektrik Kesintisi'], choosed: 'Arıza Çözümü Seçiniz'}
  	];
  	this.explanation = '-';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnarımPage');
  }

  presentPopover(ev, content) {
  	let popover = this.popoverCtrl.create(PopoverPage, {
  		content: content
  	});
  	popover.present({
  		ev: ev
  	});
  	popover.onDidDismiss(data => {
  		if (data != null)
  			content.choosed = data;
  	});
  }

}
