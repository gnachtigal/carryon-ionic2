import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { NgZone } from "@angular/core";
import * as io from 'socket.io-client';
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from "rxjs/Rx";
declare var Pusher: any;

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',

})
export class ChatPage {
    messages;
    chatId;

    myId;
    myUser;
    otherUser;

    user;
    voluntary;

    title;

    zone;
    socketHost;
    chatBox;
    socket;

    constructor(private http: Http, public navCtrl: NavController, private navParams: NavParams) {
      this.http = http;
      this.chatId = navParams.get('chatId');
      this.myId = sessionStorage.getItem('userId');
      this.messages = this.getMessages(this.chatId);
    }

    // private pusher: any;
    // private channels: any[];
    //
    // private _messages: BehaviorSubject<List<string>> = new BehaviorSubject(List([]));
    // public messages: Observable<List<string>> = this._messages.asObservable();
    //
    // constructor() {
    //     console.log('PusherService', 'constructor');
    //     this.pusher = new Pusher('f9ccff647813635fc3dc', {
    //         cluster: 'eu',
    //         encrypted: true
    //     });
    //
    //     this.pusher.logToConsole = true;
    //     this.channels = [];
    //
    //     var channel = this.pusher.subscribe('chat');
    //     channel.bind('MessageSent',  (data) => {
    //         console.log(data.message);
    //         this._messages.next(data.message);
    //     });
    // }

    sendMessage(message) {
        let body = new FormData();
        body.append('body', 'Teste');
        body.append('sender_id', sessionStorage.getItem('userId'));
        body.append('receiver_id', this.otherUser.id);
        body.append('chat_id', this.chatId);
        this.http
          .post('http://localhost:8000/api/chat/sendMessage', body)
          .map(res => res.json())
          .subscribe(
              data => {
                  this.messages.push(data.message);
              },
              err => {
                console.log("ERROR!: ", err);
              }
          );
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
                    this.otherUser = this.voluntary;
                }else{
                    this.title = this.user.name;
                    this.myUser = this.voluntary;
                    this.otherUser = this.user;
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
