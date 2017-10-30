import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {


  contacts;

  constructor(private http: Http, public navCtrl: NavController, private navParams: NavParams) {
    this.http = http;
    this.contacts = this.getContacts();
  }
  //
  // getUser(id){
  //     this.http
  //       .get('http://localhost:8000/api/user/getAuthenticatedUser/' + id)
  //       .map(res => res.json())
  //       .subscribe(
  //           data => {
  //               if(data.success){
  //                   return data.user;
  //               }else{
  //                   this.presentToast(data.msg);
  //               }
  //           },
  //           err => {
  //             console.log("ERROR!: ", err);
  //           }
  //       );
  // }

  getContacts() {
      this.http
        .get('http://localhost:8000/api/chat/' + sessionStorage.getItem('userId'))
        .map(res => res.json())
        .subscribe(
            data => {
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
