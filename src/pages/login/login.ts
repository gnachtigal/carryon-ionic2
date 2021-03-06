import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { API_ENDPOINT } from '../../app/constants';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
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

export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  email: string;
  password: string;

  data: any;

  constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController){
      this.http = http;
  }

  login() {
      let body = new FormData();
      // let headers = new Headers({ 'Content-Type': 'application/json'});
      // let options = new RequestOptions({ headers: headers });
      body.append('email', this.email);
      body.append('password', this.password);
      this.http
        .post(API_ENDPOINT + '/api/login', body)
        .map(res => res.json())
        .subscribe(
            data => {
                if(data.success){
                    // console.log(data);
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('userId', data.user.id);
                    this.goToHome(data);
                    this.presentToast(data.msg);
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

  goToRegister(){
      this.navCtrl.push(RegisterPage);
  }

  goToHome(data){
      this.navCtrl.push(TabsPage, {
          id : data.id,
          name : data.name,
          email: data.email,
      });
  }

}
