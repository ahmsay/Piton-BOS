import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {
	public loggedin: boolean;
	public username: string;

  constructor() {
  	this.loggedin = false;
  }

}
