import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { DatePipe } from '@angular/common';

import { DetayPage } from '../detay/detay';

@IonicPage()
@Component({
  selector: 'page-tamamlanan',
  templateUrl: 'tamamlanan.html',
})
export class TamamlananPage {
	defects: any;
  day: number = 0;

  constructor(public datepipe: DatePipe, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.loadToday();
  	this.defects = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TamamlananPage');
  }

  display(id) {
    this.navCtrl.push(DetayPage, {
      id: id,
      show: 'false'
    });
  }

  loadToday() {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+1);
    let baslangic = this.datepipe.transform(today, 'MM.dd.yyyy');
    let bitis = this.datepipe.transform(tomorrow, 'MM.dd.yyyy');
    this.getValues(baslangic, bitis);
  }

  loadPrevious() {
    this.day++;
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate()-this.day);
    today.setDate(yesterday.getDate()+1);
    let baslangic = this.datepipe.transform(yesterday, 'MM.dd.yyyy');
    let bitis = this.datepipe.transform(today, 'MM.dd.yyyy');
    this.getValues(baslangic, bitis);
  }

  getValues(baslangic, bitis) {
    this.global.getData('/ariza/tamamlanan/mobil?baslangic=' + baslangic + '&bitis=' + bitis)
    .then(data => {
      let len = this.global.data.length;
      for (var i=0; i<len; i++) {
        this.defects.push(this.global.data[i]);
      }
    });
  }
}
