import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, MenuController, AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HTTP } from '@ionic-native/http';

import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Nav) nav: Nav;

  constructor(public http: HTTP, public alertCtrl: AlertController, public menu: MenuController, public navCtrl: NavController, public global: GlobalProvider) {
    this.menu.swipeEnable(this.global.loggedin);
    if (this.global.loggedin)
      this.navCtrl.setRoot(MainPage);
  }

  alert(message: string, title: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Tamam']
    }).present();
  }

  login(uname: string, passw: string) {
    let url = 'http://185.183.168.175:8080/onarimapi/token';
    let body = {
      grant_type: 'password',
      password: passw,
      username: uname
    }
    this.http.post(url, body, {'Content-Type': 'application/x-www-form-urlencoded'})
    .then((data) => {
      localStorage.setItem('logged', '1');
      localStorage.setItem('user', uname);
      let x = JSON.parse(data.data);
      localStorage.setItem('token', x.access_token);
      this.navCtrl.setRoot(MainPage);
    })
    .catch((error) => {
      this.alert('Giriş bilgilerinizi kontrol ediniz.', 'Hata');
    })
  }

}