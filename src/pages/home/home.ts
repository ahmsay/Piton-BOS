import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, MenuController, AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

import { AngularFireAuth } from 'angularfire2/auth';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Nav) nav: Nav;
  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController, public fire: AngularFireAuth, public menu: MenuController, public navCtrl: NavController, public global: GlobalProvider) {
    this.menu.swipeEnable(this.global.loggedin);
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Bilgi',
      subTitle: message,
      buttons: ['Tamam']
    }).present();
  }

  login() {
      this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {
         this.navCtrl.setRoot(MainPage);
         this.global.loggedin = true;
         var x = this.email.value.split("@", 1);
         this.global.username = x;
      })
      .catch(error => {
         this.alert(error.message);
      })
  }

}
