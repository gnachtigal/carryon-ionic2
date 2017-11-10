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

    myId;
    myUser;

    user;
    voluntary;

    title;

  constructor(private http: Http, public navCtrl: NavController, private navParams: NavParams) {
    this.http = http;
    this.chatId = navParams.get('chatId');
    this.myId = sessionStorage.getItem('userId')
    this.messages = this.getMessages(this.chatId);
  }

  getMessages(chatId) {
      this.http
        .get('http://localhost:8000/api/chat/show/' + chatId)
        .map(res => res.json())
        .subscribe(
            data => {
                this.user = data.user;
                this.voluntary = data.voluntary;

                if(this.user.id == this.myId){
                    this.title = this.voluntary.name;
                    this.myUser = this.user;
                }else{
                    this.title = this.user.name;
                    this.myUser = this.voluntary;
                }

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
