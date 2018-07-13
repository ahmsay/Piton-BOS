import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

import { PopoverPage } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-arıza',
  templateUrl: 'arıza.html',
})
export class ArızaPage {
	contents: Array<{selections: string[], choosed: string, required: number, next: number[], activate: number[], url: string, IDs: string[]}>;
  display: number = 0;
  persons: any;
  saveable: boolean;
  explanation: string = null;
  sahaExplanation: string = null;
  checked: boolean = false;

  constructor(public alertCtrl: AlertController, public global:GlobalProvider, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
  	this.contents = [
  		{selections: ['Lütfen İl Seçiniz'], choosed: 'Lütfen İl Seçiniz', required: 0, next: [0,1,2,3,4], activate: [1], url: '/ariza?sorgu=liste&durum=il', IDs: ['-1']},
  		{selections: ['Lütfen Kurum Seçiniz'], choosed: 'Lütfen Kurum Seçiniz', required: 1, next: [1,2,3,4], activate: [2,3], url: '/ariza?sorgu=liste&durum=kurum&id=', IDs: ['-1']},
  		{selections: ['Lütfen Cihaz Seçiniz'], choosed: 'Lütfen Cihaz Seçiniz', required: 2, next: [2], activate: [], url: '/ariza?sorgu=liste&durum=cihaz&id=', IDs: ['-1']},
  		{selections: ['Lütfen Arıza Türü Seçiniz'], choosed: 'Lütfen Arıza Türü Seçiniz', required: 2, next: [3,4], activate: [4], url: '/ariza?sorgu=liste&durum=ariza_tur&id=', IDs: ['-1']},
  		{selections: ['Lütfen Arıza Çözümünü Seçiniz'], choosed: 'Lütfen Arıza Çözümünü Seçiniz', required: 4, next: [4], activate: [], url: '/ariza?sorgu=liste&durum=ariza_cozum&id=', IDs: ['-1']}
  	];
    this.getPersons();
    this.getValues(0, '', 'ISIM');
    this.saveable = false;
    this.persons = [];
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
            for (let i of content.activate) {
                this.getValues(i, id, 'AD');
                this.display = i;
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
    if (content.activate.length != 0)
      this.display = this.contents.indexOf(content);
    for (let i of content.next)
      this.contents[i].choosed = this.contents[i].selections[0];
  }

  getPersons() {
    this.global.getData('/ariza?sorgu=liste&durum=ilgili_kisi')
    .then(data => {
      for (let p of this.global.data) {
        let temp = {name: p.adi, checked: false, id: p.id}
        this.persons.push(temp);
      }
    });
  }

  save() {
    let obj = {
      "cihaz": this.contents[2].IDs[this.contents[2].selections.indexOf(this.contents[2].choosed)],
      "kurum": this.contents[1].IDs[this.contents[1].selections.indexOf(this.contents[1].choosed)],
      "turid": this.contents[3].IDs[this.contents[3].selections.indexOf(this.contents[3].choosed)],
      "il": this.contents[0].IDs[this.contents[0].selections.indexOf(this.contents[0].choosed)],
      "kaydigiren": localStorage.getItem('user'),
      "aciklama": this.explanation == null ? "-" : this.explanation,
      "atanan": [],
      "gorus": this.sahaExplanation == null ? "-" : this.sahaExplanation,
      "cozumid": this.contents[4].IDs[this.contents[4].selections.indexOf(this.contents[4].choosed)],
      "soruncozuldu": this.checked
    }
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].checked)
        obj.atanan.push(this.persons[i].id);
    }
    console.log(obj);
    /*this.global.postData('http://185.183.168.175:8080/onarimapi/ariza', obj)
    .then(data => {
      console.log(data);
      this.alert('Arıza başarıyla kaydedildi.', 'Kaydedildi');
    })
    .catch(error => {
      console.log(error);
      this.alert('Bir hata oluştu. Lütfen tekrar deneyiniz.', 'Hata');
    })*/
  }

  alert(message: string, title: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Tamam']
    }).present();
  }

}

//display: contents' teki elemanların ilk kaçının aktif olması geretiğini tutar (index olarak)
//required: contents' teki elemanın aktifleşmesi için display değerinin en az kaç olması gerektiğini tutar
//next: eğer butonun seçeneği değiştirilirse resetlenmesi gereken butonların indexlerini tutar
//activate: seçilen butondan sonra aktifleşmesi gereken butonların indexlerini tutar