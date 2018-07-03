import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { DatePipe } from '@angular/common';

import { OnarımPage } from '../onarım/onarım';

@IonicPage()
@Component({
  selector: 'page-detay',
  templateUrl: 'detay.html',
})
export class DetayPage {
  id: number;
	map: Array<{key: string, value: any}>;
  map2: Array<{key: string, value: any}>;
  show: string;
  public category: string = 'record';
  public categories: Array<string> = ['record', 'info'];

  constructor(public datepipe: DatePipe, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.id = navParams.get('id');
    this.show = navParams.get('show');
    this.getValues(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetayPage');
  }

  openOnar() {
    this.navCtrl.push(OnarımPage);
  }

  onTabChanged(tabName) {
    this.category = tabName;
  }

  getValues(id) {
    this.global.getData('/ariza/bekleyen/' + id)
    .then(data => {
      let tarih = this.datepipe.transform(this.global.data.TARIH, 'dd.MM.yyyy HH:mm');
      let kontroltarihi = this.datepipe.transform(this.global.data.KONTROLTARIHI, 'dd.MM.yyyy HH:mm');
      this.map = [
        { key: 'İl', value: this.global.data.IL },
        { key: 'Kurum', value: this.global.data.KURUM },
        { key: 'Cihaz', value: this.global.data.CIHAZ },
        { key: 'Çağrı Arıza Türü', value: this.global.data.ARIZATUR },
        { key: 'Kayıt Oluşturan', value: this.global.data.KAYITOLUSTURAN },
        { key: 'Arıza Açıklama', value: this.global.data.ACIKLAMA },
        { key: 'Çağrı Merkezi Görüşü', value: this.global.data.CMACIKLAMA },
        { key: 'Kayıt Tarihi', value: tarih },
        { key: 'İlgili Kişi', value: this.global.data.ILGILIKISI }
      ];
      this.map2 = [
        { key: 'Kontrol Tarihi', value: kontroltarihi },
        { key: 'Saha Arıza Türü', value: this.global.data.ARIZATUR },
        { key: 'Durum', value: this.global.data.DURUM },
        { key: 'Kontrol Açıklama', value: '' },
        { key: 'Parça Değişikliği', value: '' }
    ];
    });
  }

}
