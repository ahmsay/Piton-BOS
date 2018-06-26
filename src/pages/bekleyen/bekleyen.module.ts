import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BekleyenPage } from './bekleyen';

@NgModule({
  declarations: [
    BekleyenPage,
  ],
  imports: [
    IonicPageModule.forChild(BekleyenPage),
  ],
})
export class BekleyenPageModule {}
