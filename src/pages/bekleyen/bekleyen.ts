import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

import { DetayPage } from '../detay/detay';

@IonicPage()
@Component({
  selector: 'page-bekleyen',
  templateUrl: 'bekleyen.html',
})
export class BekleyenPage {
	defects: any;

  constructor(public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.getValues();
  	this.defects = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BekleyenPage');
  }

  display(defect) {
    /*this.navCtrl.push(DetayPage, {
      defect: defect,
      show: 'true'
    });*/
    console.log(defect);
  }

  getValues() {
    this.global.getData('/ariza/bekleyen/mobil')
    .then(data => {
      let len = this.global.data.length;
      for (var i=0; i<len; i++) {
        this.defects.push(this.global.data[i]);
        var x = this.defects[i].TARIH.substring(0,10);
        this.defects[i].TARIH = x;
      }
    });
  }
}
