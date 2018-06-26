import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
	content: any;
	check: string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  	this.content = navParams.get('content');
  	this.check = this.content.choosed;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  select(selection) {
  	this.viewCtrl.dismiss(selection);
  }

}
