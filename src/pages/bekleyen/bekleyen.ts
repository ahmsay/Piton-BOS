import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetayPage } from '../detay/detay';

@IonicPage()
@Component({
  selector: 'page-bekleyen',
  templateUrl: 'bekleyen.html',
})
export class BekleyenPage {
	defects: Array<{title: string, issue: string, date: string, status: string, person: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.defects = [
  		{title: 'Erdem Tahsilat-2014', issue:'Kiosk İşlem Almıyor', date: '19.06.2018 10:10', status: 'Çalışmaya Devam Ediyor', person:'Murat Aslan'},
      {title: '100.Yıl Merkez Çarşı 7/24-4048', issue:'Pos Cihazı Arızası', date: '19.06.2018 10:35', status: 'Yeni', person:'Çagri Karatas'}
  	];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BekleyenPage');
  }

  display(defect) {
    this.navCtrl.push(DetayPage, {
      defect: defect,
      show: 'true'
    });
  }

}
