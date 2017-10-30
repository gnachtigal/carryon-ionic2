import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',

})
export class ChatPage {


  messages;
  chatId;

  constructor(private http: Http, public navCtrl: NavController, private navParams: NavParams) {
    this.http = http;
    this.chatId = navParams.get('chatId');
    this.messages = this.getMessages(1);
    console.log(this.chatId);
  }

  getMessages(chatId) {
      this.http
        .get('http://localhost:8000/api/chat/show/' + chatId)
        .map(res => res.json())
        .subscribe(
            data => {
                console.log(data.messages);
                this.messages = data.messages;
                return data.messages;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }
}
