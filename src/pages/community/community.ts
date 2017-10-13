import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
})
export class CommunityPage {

  contacts;

  constructor(private http: Http) {
    this.http = http;
    this.contacts = this.getContacts();
  }

  getContacts() {
      this.http
        .get('http://localhost:8000/api/chat')
        .map(res => res.json())
        .subscribe(
            data => {
                console.log(data);

                this.contacts = data.chats;
                return data.chats;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }


}
