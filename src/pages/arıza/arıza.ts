import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-arıza',
  templateUrl: 'arıza.html',
})
export class ArızaPage {
	contents: Array<{selections: string[], choosed: string}>;
	show: string;
  display: number;
  persons: string[];

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
  	this.contents = [
  		{selections: ['Lütfen İl Seçiniz', 'Aksaray', 'Ankara', 'Manisa', 'Tekirdağ', 'Tüm İller'], choosed: 'Lütfen İl Seçiniz'},
  		{selections: ['Lütfen Kurum Seçiniz', 'A', 'B', 'C'], choosed: 'Lütfen Kurum Seçiniz'},
  		{selections: ['Lütfen Cihaz Seçiniz', 'A', 'B'], choosed: 'Lütfen Cihaz Seçiniz'},
  		{selections: ['Lütfen Arıza Türü Seçiniz', 'A', 'B', 'C', 'D'], choosed: 'Lütfen Arıza Türü Seçiniz'},
  		{selections: ['Lütfen Arıza Çözümünü Seçiniz', 'A', 'B', 'C'], choosed: 'Lütfen Arıza Çözümünü Seçiniz'}
  	];
    this.display = 0;
    this.persons = ['Cafer Kabakçı', 'Çağrı Karataş', 'Gökhan Taşdemir', 'Ferhat Yertutan'];
  }

  presentPopover(ev, content) {
    if (this.display >= this.contents.indexOf(content)) {
      let popover = this.popoverCtrl.create(PopoverPage, {
        content: content
      });
      popover.present({
        ev: ev
      });
      popover.onDidDismiss(data => {
        if (data != null && data != content.selections[0] && content.choosed == content.selections[0]) {
          this.display++;
          content.choosed = data;
        } else if (data == content.selections[0]) {
          this.display = this.contents.indexOf(content);
          for (let i = this.display; i < this.contents.length; i++) {
            this.contents[i].choosed = this.contents[i].selections[0];
          }
        }
        if (data != null)
          content.choosed = data;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArızaPage');
  }

}
