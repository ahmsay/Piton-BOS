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
	contents: Array<{category: string, selections: any, choosed: string, IDs: string[]}>;
	explanation: string;
  tableid: number;
  kurumid: number;
  turid: number;
  durum: number;
  cozumid: number;
  durumList: any;
  turList: any;
  cozumList: any;

  constructor(public global: GlobalProvider, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
    this.tableid = navParams.get('tableid');
  	this.contents = [
  	{category: 'Arıza Durumu', selections: ['Arıza Durumu Seçiniz'], choosed: 'Arıza Durumu Seçiniz', IDs:["-1"]},
  	{category: 'Arıza Türü', selections: ['Arıza Türü Seçiniz'], choosed: 'Arıza Türü Seçiniz', IDs:["-1"]},
  	{category: 'Arıza Çözüm', selections: ['Arıza Çözümü Seçiniz'], choosed: 'Arıza Çözümü Seçiniz', IDs:["-1"]}
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
      console.log(this.contents);
    });
  }

  getDurum() {
    this.global.getData('/ariza?sorgu=liste&durum=ariza_durumu')
    .then(data => {
      this.durumList = data;
      this.contents[0].selections.push(data[1]);
      this.contents[0].selections.push(data[2]);
      this.contents[0].selections.push(data[3]);
      this.contents[0].selections.push(data[4]);
      this.contents[0].selections.push(data[6]);
      this.contents[0].choosed = data[this.durum];
      this.contents[0].IDs.push("1");
      this.contents[0].IDs.push("2");
      this.contents[0].IDs.push("3");
      this.contents[0].IDs.push("4");
      this.contents[0].IDs.push("6");
    });
  }

  getArizatur() {
    this.global.getData('/ariza?sorgu=liste&durum=ariza_tur&id=' + this.kurumid)
    .then(data => {
      this.turList = data;
      let temp: any = data;
      for (let i of temp) {
        this.contents[1].selections.push(i.AD);
        this.contents[1].IDs.push(i.TABLEID);
        if (i.TABLEID == this.turid)
          this.contents[1].choosed = i.AD;
      }
    });
  }

  getArizacozum() {
    this.global.getData('/ariza?sorgu=liste&durum=ariza_cozum&id=' + this.turid)
    .then(data => {
      this.cozumList = data;
      let temp: any = data;
      for (let i of temp) {
        this.contents[2].selections.push(i.AD);
        this.contents[2].IDs.push(i.TABLEID);
        if (i.TABLEID == this.cozumid)
          this.contents[2].choosed = i.AD;
      }
    });
  }

  save() {
    let obj = {
      "ariza": {
        "aciklama": "deneme6",
        "durumid": '2',
        "turid": '609',
        "cozumid": '598'
      }
    }
    console.log(obj);
    console.log(this.tableid);
    this.global.putData('http://185.183.168.175:8080/onarimapi/ariza/' + this.tableid, obj);
    /*console.log(this.durumList);
    console.log(this.turList);
    console.log(this.cozumList);*/
  }

}
