import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from "../providers/global/global";
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { ArızaPage } from '../pages/arıza/arıza';
import { BekleyenPage } from '../pages/bekleyen/bekleyen';
import { TamamlananPage } from '../pages/tamamlanan/tamamlanan';
import { MainPage } from '../pages/main/main';
import { YardımPage } from '../pages/yardım/yardım';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, show: string}>;
  subPages: Array<{title: string, component: any, show: string}>;

  constructor(public menu: MenuController, public fire: AngularFireAuth, public platform: Platform, public splashScreen: SplashScreen, public global: GlobalProvider) {
    this.initializeApp();

    this.subPages = [];
    this.pages = [
      { title: 'Anasayfa', component: MainPage, show: '1' },
      { title: 'Arıza İşlemleri', component: null, show: '1' },
      { title: 'Arıza Oluştur', component: ArızaPage, show: '0' },
      { title: 'Bekleyen Arızalar', component: BekleyenPage, show: '0' },
      { title: 'Tamamlanan Arızalar', component: TamamlananPage, show: '0' },
      { title: 'Yardım', component: YardımPage, show: '1' },
      { title: 'Çıkış Yap', component: null, show: '1'}
    ];

    this.subPages.push(this.pages[2]);
    this.subPages.push(this.pages[3]);
    this.subPages.push(this.pages[4]);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
    });
  }

  managePage(page) {
    if (page.title == 'Arıza İşlemleri') {
      this.changeShow();
    }
    else if (page.title == 'Çıkış Yap') {
      if (this.subPages[0].show == '1')
        this.changeShow();
      this.menu.close();
      this.logout();
    }
    else {
      this.menu.close();
      this.nav.setRoot(page.component);
    }
  }

  changeShow() {
    for (let p of this.subPages) {
      p.show = (p.show == '1') ? (p.show = '0') : (p.show = '1');
    }
  }

  logout() {
    this.fire.auth.signOut();
    this.global.loggedin = false;
    this.nav.setRoot(HomePage);
  }

}
