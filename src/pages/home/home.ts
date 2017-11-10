import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class HomePage {

   voluntary;

  constructor(private http: Http, public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
      this.http = http;
      this.voluntary = this.getUser();
  }

  getUser(){
      this.http
        .get('http://localhost:8000/api/user/getUser/' + sessionStorage.getItem('userId'))
        .map(res => res.json())
        .subscribe(
            data => {
                if(data.success){
                    this.voluntary = data.user.voluntary;
                }else{
                    console.log(sessionStorage.getItem('userId'));
                }
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }

  setVoluntary(){
      let body = new FormData();
      body.append('id', sessionStorage.getItem('userId'));
      this.http
        .post('http://localhost:8000/api/chat/setVoluntary/', body)
        .map(res => res.json())
        .subscribe(
            data => {
                if(data.success){
                    this.presentToast(data.msg);
                    console.log(data.voluntaries);
                }else{
                    console.log(sessionStorage.getItem('userId'));
                }
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }

  startSearch(){
    this.presentLoading();
  }

  searchVoluntary(){
      this.http
        .get('http://localhost:8000/api/chat/searchVoluntary/' + sessionStorage.getItem('userId'))
        .map(res => res.json())
        .subscribe(
            data => {
                if(data.success){
                    this.presentChatConfirm("Encontramos um voluntário!", data.voluntary.name + " se disponibilizou a ajudá-lo! Deseja iniciar uma conversa agora mesmo?", data.chat.id);
                }else{
                    this.showAlert("Sinto muito! :(", "Infelizmente não há nenhum voluntário disponível no momento. Tente novamente mais tarde.");
                }
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Procurando um voluntário...",
    });

    loader.present();

    setTimeout(() => {
        loader.dismiss();
        this.searchVoluntary();
    }, 3000);
  }

  presentChatConfirm(title, msg, chatId) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: 'Não',
          handler: () => {

          }
        },
        {
          text: 'Claro!',
          handler: () => {
            this.goToChat(chatId);
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert(title, msg) {
   let alert = this.alertCtrl.create({
     title: title,
     subTitle: msg,
     buttons: ['OK']
   });
   alert.present();
 }

  goToChat(chatId){
    this.navCtrl.push(ChatPage, {
        chatId: chatId
    });
  }
}
