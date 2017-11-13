import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { API_ENDPOINT } from '../../app/constants';

@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',

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
export class PresentationPage {

    user;
    id: number;
    name: string;
    email: string;

  constructor(public navCtrl: NavController, private http: Http, private navParams: NavParams, public toastCtrl: ToastController) {
    this.id = navParams.get('id');
    this.name = navParams.get('name');
    this.email = navParams.get('email');
    this.slides[0].title += navParams.get('name') + '!';
  }

    slides = [
        {
            title: "Seja bem-vindo, ",
            description: "Sinta-se livre para compartilhar tudo (e somente) o que desejar.",
            image: "assets/images/thinking.png",
        },
        {
            title: "Faça contatos!",
            description: "<b>Carry On</b> é uma plataforma de relacionamento entre voluntários e pacientes. Procure ajuda sempre que precisar.",
            image: "assets/images/smartphone.png",
        },
        {
            title: "Cresça com a gente!",
            description: "Nós da <b> Carry On </b> lhe desejamos uma ótima experiência. Sinta-se à vontade para reportar erros ou problemas e indicar melhorias.",
            image: "assets/images/employee.png",
        }
    ];

    goToHome(){
        this.user = this.getUser(sessionStorage.getItem('userId'));
        this.navCtrl.push(TabsPage, {
            user: this.user
        });
    }

    getUser(id){
        this.http
          .get(API_ENDPOINT + '/api/user/getAuthenticatedUser/' + id)
          .map(res => res.json())
          .subscribe(
              data => {
                  if(data.success){
                      return data.user;
                  }else{
                      this.presentToast(data.msg);
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
        duration: 3000
      });
      toast.present();
    }

}
