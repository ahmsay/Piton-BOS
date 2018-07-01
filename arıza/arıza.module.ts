import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArızaPage } from './arıza';

@NgModule({
  declarations: [
    ArızaPage,
  ],
  imports: [
    IonicPageModule.forChild(ArızaPage),
  ],
})
export class ArızaPageModule {}
