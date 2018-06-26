import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SwipeSegmentDirective } from '../directives/swipe-segment/swipe-segment';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArızaPage } from '../pages/arıza/arıza';
import { DetayPage } from '../pages/detay/detay';
import { BekleyenPage } from '../pages/bekleyen/bekleyen';
import { TamamlananPage } from '../pages/tamamlanan/tamamlanan';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MainPage } from '../pages/main/main';
import { YardımPage } from '../pages/yardım/yardım';
import { OnarımPage } from '../pages/onarım/onarım';
import { PopoverPage } from '../pages/popover/popover';

import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';

export const firebaseAuth = {
    apiKey: "AIzaSyDkHWJ7TG7JnQkCz7zcfgrR6YWPUEjEC9I",
    authDomain: "interface0-d1a9e.firebaseapp.com",
    databaseURL: "https://interface0-d1a9e.firebaseio.com",
    projectId: "interface0-d1a9e",
    storageBucket: "",
    messagingSenderId: "798678196226"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArızaPage,
    DetayPage,
    BekleyenPage,
    TamamlananPage,
    MainPage,
    YardımPage,
    OnarımPage,
    PopoverPage,
    SwipeSegmentDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArızaPage,
    DetayPage,
    BekleyenPage,
    TamamlananPage,
    MainPage,
    YardımPage,
    OnarımPage,
    PopoverPage
  ],
  providers: [
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider
  ]
})
export class AppModule {}
