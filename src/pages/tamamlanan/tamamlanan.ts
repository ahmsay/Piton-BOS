import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetayPage } from '../detay/detay';

@IonicPage()
@Component({
  selector: 'page-tamamlanan',
  templateUrl: 'tamamlanan.html',
})
export class TamamlananPage {
	defects: Array<{title: string, issue: string, date: string, status: string, person: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.defects = [
  		{title: 'Dikimevi PTT-4036', issue:'Kiosk İşlem Almıyor', date: '19.06.2018 09:49', status: 'Arıza Giderildi', person:'Çagri Karatas'},
      	{title: 'Saruhanlı Maski-7002', issue:'Pos Cihazı Arızası', date: '19.06.2018 09:10', status: 'Arıza Giderildi', person:'Ferhat Yertutan'}
  	];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TamamlananPage');
  }

  display(defect) {
  	this.navCtrl.push(DetayPage, {
  		defect: defect,
      show: 'false'
  	});
  }

}
