import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ChatPage } from '../chat/chat';
import { API_ENDPOINT } from '../../app/constants';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {


  contacts;

  constructor(private http: Http, public navCtrl: NavController) {
    this.http = http;
    this.contacts = this.getContacts();
  }


  getContacts() {
      this.http
        .get(API_ENDPOINT + '/api/chat/' + sessionStorage.getItem('userId'))
        .map(res => res.json())
        .subscribe(
            data => {
                console.log(data.chats);
                this.contacts = data.chats;
                return data.chats;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }

  openChat(chatId){
      this.navCtrl.push(ChatPage, {
          chatId: chatId
      });
  }
}
