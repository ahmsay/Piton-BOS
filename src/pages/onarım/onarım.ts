import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

import { PopoverPage } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-onarım',
  templateUrl: 'onarım.html',
})
export class OnarımPage {
	contents: Array<{category: string, selections: string[], choosed: string}>;
	explanation: string;
  tableid: number;
  kurumid: number;
  turid: number;
  durum: number;
  cozumid: number;

  constructor(public global: GlobalProvider, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
    this.tableid = navParams.get('tableid');
  	this.contents = [
  	{category: 'Arıza Durumu', selections: ['Arıza Durumu Seçiniz'], choosed: 'Arıza Durumu Seçiniz'},
  	{category: 'Arıza Türü', selections: ['Arıza Türü Seçiniz'], choosed: 'Arıza Türü Seçiniz'},
  	{category: 'Arıza Çözüm', selections: ['Arıza Çözümü Seçiniz'], choosed: 'Arıza Çözümü Seçiniz'}
  	];
  	this.explanation = '-';
    this.getValues();
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

  getValues() {
    this.global.getData('/ariza/?sorgu=detay&id=' + this.tableid)
    .then(data => {
      this.explanation = data['aciklama'];
      this.durum = data['durum'];
      this.kurumid = data['kurum'];
      this.turid = data['tur'];
      this.cozumid = data['cozum'];
      this.getDurum();
      this.getArizatur();
      this.getArizacozum();
    });
  }

  getDurum() {
    this.global.getData('/ariza?sorgu=liste&durum=ariza_durumu')
    .then(data => {
      this.contents[0].selections.push(data[1]);
      this.contents[0].selections.push(data[2]);
      this.contents[0].selections.push(data[3]);
      this.contents[0].selections.push(data[4]);
      this.contents[0].selections.push(data[6]);
      this.contents[0].choosed = data[this.durum];
    });
  }

  getArizatur() {
    this.global.getData('/ariza?sorgu=liste&durum=ariza_tur&id=' + this.kurumid)
    .then(data => {
      let temp: any = data;
      for (let i of temp) {
        this.contents[1].selections.push(i.AD);
        if (i.TABLEID == this.turid)
          this.contents[1].choosed = i.AD;
      }
    });
  }

  getArizacozum() {
    this.global.getData('/ariza?sorgu=liste&durum=ariza_cozum&id=' + this.turid)
    .then(data => {
      let temp: any = data;
      for (let i of temp) {
        this.contents[2].selections.push(i.AD);
        if (i.TABLEID == this.cozumid)
          this.contents[2].choosed = i.AD;
      }
    });
  }

}
