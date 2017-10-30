import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PresentationPage } from '../presentation/presentation';
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
  voluntary: boolean = false;
  password: string;
  password_confirmation: string;


  constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController){
      this.http = http;
  }

  register() {
      let body = new FormData();
      //   let headers = new Headers({ 'Content-Type': 'application/json'});
      //   let options = new RequestOptions({ headers: headers });
      body.append('name', this.name);
      body.append('email', this.email);
      body.append('voluntary', this.voluntary.toString());
      body.append('password', this.password);
      body.append('password_confirmation', this.password_confirmation);
      console.log(this.voluntary);
      this.http
        .post('http://localhost:8000/api/register', body)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log(data);
              if(data.success){
                  this.presentToast('Usuário cadastrado com sucesso!');
                  sessionStorage.setItem('token', data.token);
                  sessionStorage.setItem('userId', data.user.id);
                  this.goToPresentation(data.user);
              }else{
                  this.presentToast(data.errors[0]);
              }

            },
            err => {
                JSON.parse(err.errors);
                console.log(err);
                this.presentToast(err.errors[0]);
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

  goToPresentation(data){
      this.navCtrl.push(PresentationPage, {
          id : data.id,
          name : data.name,
          email: data.email,
      });
  }

}
