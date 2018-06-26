import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OnarımPage } from '../onarım/onarım';

@IonicPage()
@Component({
  selector: 'page-detay',
  templateUrl: 'detay.html',
})
export class DetayPage {
	defect: any;
	detail: string;
	map: Array<{key: string, value: string}>;
  map2: Array<{key: string, value: string}>;
  show: string;
  public category: string = 'record';
  public categories: Array<string> = ['record', 'info'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.defect = navParams.get('defect');
    this.show = navParams.get('show');
  	this.detail = 'record';
  	this.map = [
  		{key: 'İl', value: this.defect.city},
  		{key: 'Kurum', value: this.defect.kurum},
  		{key: 'Cihaz', value: this.defect.title},
  		{key: 'Çağrı Arıza Türü', value: this.defect.issue},
  		{key: 'Kayıt Oluşturan', value: this.defect.recorder},
  		{key: 'Arıza Açıklama', value: this.defect.moreinfo},
  		{key: 'Çağrı Merkezi Görüşü', value: this.defect.whatisthis},
  		{key: 'Kayıt Tarihi', value: this.defect.date},
  		{key: 'İlgili Kişi', value: this.defect.person}
  	];
    this.map2 = [
      {key: 'Kontrol Tarihi', value: ''},
      {key: 'Saha Arıza Türü', value: ''},
      {key: 'Durum', value: ''},
      {key: 'Kontrol Açıklama', value: ''},
      {key: 'Parça Değişikliği', value: ''}
    ];
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

}
