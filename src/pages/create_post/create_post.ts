import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PresentationPage } from '../presentation/presentation';
import { CommunityPage } from '../community/community';
import { ToastController } from 'ionic-angular';
import { API_ENDPOINT } from '../../app/constants';

@Component({
  selector: 'page-create-post',
  templateUrl: 'create_post.html'
})

export class CreatePostPage {
  title: string;
  body: string;

  constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController){
      this.http = http;
  }

  create() {
      let body = new FormData();
      //   let headers = new Headers({ 'Content-Type': 'application/json'});
      //   let options = new RequestOptions({ headers: headers });
      body.append('title', this.title);
      body.append('body', this.body);
      body.append('user_id', sessionStorage.getItem('userId'));
      this.http
        .post(API_ENDPOINT + '/api/post/create', body)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log(data);
              if(data.success){
                  this.presentToast('Postagem criada com sucesso!');
                  this.goBack();
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

  goBack(){
      this.navCtrl.push(CommunityPage);
  }

}
