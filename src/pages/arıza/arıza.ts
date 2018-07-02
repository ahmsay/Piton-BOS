import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

import { PopoverPage } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-arıza',
  templateUrl: 'arıza.html',
})
export class ArızaPage {
	contents: Array<{selections: string[], choosed: string, required: number, next: number[], url: string, IDs: string[]}>;
  display: number = 0;
  persons: string[] = [];
  saveable: boolean;

  constructor(public global:GlobalProvider, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
  	this.contents = [
  		{selections: ['Lütfen İl Seçiniz'], choosed: 'Lütfen İl Seçiniz', required: 0, next: [0,1,2,3,4], url: '/ariza?sorgu=liste&durum=il', IDs: ['-1']},
  		{selections: ['Lütfen Kurum Seçiniz'], choosed: 'Lütfen Kurum Seçiniz', required: 1, next: [1,2,3,4], url: '/ariza?sorgu=liste&durum=kurum&id=', IDs: ['-1']},
  		{selections: ['Lütfen Cihaz Seçiniz'], choosed: 'Lütfen Cihaz Seçiniz', required: 2, next: [2], url: '/ariza?sorgu=liste&durum=cihaz&id=', IDs: ['-1']},
  		{selections: ['Lütfen Arıza Türü Seçiniz'], choosed: 'Lütfen Arıza Türü Seçiniz', required: 2, next: [3,4], url: '/ariza?sorgu=liste&durum=ariza_tur&id=', IDs: ['-1']},
  		{selections: ['Lütfen Arıza Çözümünü Seçiniz'], choosed: 'Lütfen Arıza Çözümünü Seçiniz', required: 4, next: [4], url: '/ariza?sorgu=liste&durum=ariza_cozum&id=', IDs: ['-1']}
  	];
    this.getPersons();
    this.getValues(0, '', 'ISIM');
    this.saveable = false;
  }

  presentPopover(ev, content) {
    if (this.display >= content.required) {
      let popover = this.popoverCtrl.create(PopoverPage, {
        content: content
      });
      popover.present({
        ev: ev
      });
      popover.onDidDismiss(data => {
        if (data != null) {
          if (data != content.selections[0]) {
            let index = content.selections.indexOf(data);
            let id = content.IDs[index];
            this.cancelAfter(content);
            if (content.choosed == content.selections[0]) {
              this.display = (this.contents.indexOf(content)) + 1;
            }
            for (let i of this.contents) {
              if (this.display == i.required) {
                let j = this.contents.indexOf(i);
                this.getValues(j, id, 'AD');
              }
            }
          } else {
            this.cancelAfter(content);
          }
          content.choosed = data;
          if ((this.contents[2].choosed != this.contents[2].selections[0]) && (this.contents[3].choosed != this.contents[3].selections[0]))
            this.saveable = true;
          else
            this.saveable = false;
        }
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArızaPage');
  }

  getValues(index: number, id: string, key: string) {
    let url = this.contents[index].url;
    this.global.getData(url+id)
    .then(data => {
      let temp: any;
      temp = data;
      let tempDataName = [this.contents[index].selections[0]];
      let tempDataKey = ['-1'];
      for (let item of temp) {
        tempDataName.push(item[key]);
        tempDataKey.push(item.TABLEID);
      }
      this.contents[index].selections = tempDataName;
      this.contents[index].IDs = tempDataKey;
    });
  }

  cancelAfter(content) {
    this.display = this.contents.indexOf(content);
    for (let i of content.next)
      this.contents[i].choosed = this.contents[i].selections[0];
  }

  getPersons() {
    this.global.getData('/ariza?sorgu=liste&durum=ilgili_kisi')
    .then(data => {
      for (let p of this.global.data)
        this.persons.push(p.adi);
    });
  }

  save() {
    let obj = [];
    for (let content of this.contents)
      obj.push(content.choosed);
    console.log(obj);
  }

}
