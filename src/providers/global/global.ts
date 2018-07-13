import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class GlobalProvider {
	public loggedin: boolean;
	public data: any;

  constructor(public http: HTTP) {
  	if (localStorage.getItem('logged') == '1')
  		this.loggedin = true;
  	else
  		this.loggedin = false;
  }

  getData(extension: string) {
  	let url = 'http://185.183.168.175:8080/onarimapi' + extension;
  	let headers = {
      	'Content-Type': 'application/x-www-form-urlencoded',
      	'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return new Promise(resolve => {
    	this.http.get(url, {}, headers)
    	.then(data => {
        let x = JSON.parse(data.data);
    		this.data = x;
    		resolve(this.data);
    	})
    	.catch(error => {
      		console.log(error);
    	});
    });
  }

  postData(url: string, body: any) {
    return new Promise(resolve => {
      this.http.post(url, body, {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        let x = JSON.parse(data.data);
        this.data = x;
        resolve(this.data);
      })
      .catch((error) => {
        let x = JSON.parse(error);
        this.data = x;
        resolve(this.data);
      })
    })
  }

  putData(url: string, body: any) {
    return new Promise(resolve => {
      this.http.put(url, body, {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
    })
  }

}
