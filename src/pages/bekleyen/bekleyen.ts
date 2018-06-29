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

  display(id) {
    this.navCtrl.push(DetayPage, {
      id: id,
      show: 'true'
    });
  }

  getValues() {
    this.global.getData('/ariza/bekleyen/mobil')
    .then(data => {
      let len = this.global.data.length;
      for (var i=0; i<len; i++) {
        this.defects.push(this.global.data[i]);
      }
    });
  }
}
