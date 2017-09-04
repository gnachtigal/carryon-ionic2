import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',

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

export class RegisterPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  name: string;
  email: string;
  password: string;
  c_password: string

  constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController){
      this.http = http;
  }

  register() {
      let body = new FormData();
      //   let headers = new Headers({ 'Content-Type': 'application/json'});
      //   let options = new RequestOptions({ headers: headers });
      body.append('name', this.name);
      body.append('email', this.email);
      body.append('password', this.password);
      body.append('c_password', this.c_password);
      console.log(body);
      this.http
        .post('http://phplaravel-113480-323235.cloudwaysapps.com/api/register', body)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log(data);
              this.presentToast();
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuário cadastrado com sucesso!',
      duration: 3000
    });
    toast.present();
  }

}
