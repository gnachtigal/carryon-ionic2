import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { NgZone } from "@angular/core";
// import * as io from 'socket.io-client';
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from "rxjs/Rx";
import { API_ENDPOINT } from '../../app/constants';
declare var Pusher: any;

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',

})
export class ChatPage implements OnInit, AfterViewChecked {
    private array: any[];
    private pusher: any;
    private channels: any[];

    @ViewChild('content') content:any;

    messages;
    chatId;

    myId;
    myUser;
    otherUser;

    user;
    voluntary;

    title;

    body: string;

    constructor(private http: Http, public navCtrl: NavController, private navParams: NavParams) {
      this.channels = [];
      this.http = http;
      this.chatId = navParams.get('chatId');
      this.myId = sessionStorage.getItem('userId');
      this.messages = this.getMessages(this.chatId);

      console.log('PusherService', 'constructor');

      this.pusher = new Pusher('f9ccff647813635fc3dc', {
          encrypted: true,
          cluster: 'mt1'
      });

      var channel = this.pusher.subscribe('chat.' + this.chatId);
      channel.bind('newMessage',  (data) => {
          this.messages.push(data.message);
          console.log(data);
          setTimeout(() => {
              this.content.scrollToBottom(300);//300ms animation speed
          });
      });

      this.pusher.logToConsole = true;
    }

    ionViewDidEnter(){
      this.content.scrollToBottom(300);//300ms animation speed
    }

    sendMessage() {
        let body = new FormData();
        body.append('body', this.body);
        body.append('sender_id', sessionStorage.getItem('userId'));
        body.append('receiver_id', this.otherUser.id);
        body.append('chat_id', this.chatId);
        this.http
          .post(API_ENDPOINT + '/api/chat/sendMessage', body)
          .map(res => res.json())
          .subscribe(
              data => {
              },
              err => {
                console.log("ERROR!: ", err);
              }
          );
    }

    getMessages(chatId) {
      this.http
        .get(API_ENDPOINT + '/api/chat/show/' + chatId)
        .map(res => res.json())
        .subscribe(
            data => {
                this.user = data.user;
                this.voluntary = data.voluntary;

                if(this.user.id == this.myId){
                    this.title = this.voluntary.name;
                    this.myUser = this.user;
                    this.otherUser = this.voluntary;
                }else{
                    this.title = this.user.name;
                    this.myUser = this.voluntary;
                    this.otherUser = this.user;
                }

                console.log(data.messages);
                this.messages = data.messages;
                return data.firstMessages;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
    }
}
