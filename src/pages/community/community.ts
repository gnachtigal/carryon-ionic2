import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { PostPage } from '../post/post';
import { CreatePostPage } from '../create_post/create_post';
import { ModalController } from 'ionic-angular';
import { API_ENDPOINT } from '../../app/constants';

@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
})
export class CommunityPage {
    posts;
    filter;

    constructor(private http: Http, public navCtrl: NavController, public modalCtrl: ModalController) {
      this.http = http;
      this.posts = this.getPosts('all');
    }

    getPosts(filter) {
        this.http
          .get(API_ENDPOINT + '/api/post/index/' + filter + '/' +  sessionStorage.getItem('userId'))
          .map(res => res.json())
          .subscribe(
              data => {
                  console.log(data);
                  this.posts = data.posts;
                  this.filter = filter;
                  return data.posts;
              },
              err => {
                console.log("ERROR!: ", err);
              }
          );
    }

    openPost(postId){
        let modal = this.modalCtrl.create(PostPage, { postId: postId });
        modal.present();
    }

    goToCreate(){
        this.navCtrl.push(CreatePostPage);
    }

    likePost(postId){
        this.http
          .get(API_ENDPOINT + '/api/post/likePost/' + postId +  '/' + sessionStorage.getItem('userId'))
          .map(res => res.json())
          .subscribe(
              data => {
                  return data;
              },
              err => {
                console.log("ERROR!: ", err);
              }
          );
        this.posts[postId].likes_count = this.getPosts(this.filter)[postId].likes_count;
    }

    favoritePost(postId){
        this.http
          .get(API_ENDPOINT + '/api/post/favoritePost/' + postId + '/' +  sessionStorage.getItem('userId'))
          .map(res => res.json())
          .subscribe(
              data => {
                  return data;
              },
              err => {
                console.log("ERROR!: ", err);
              }
          );

        this.posts[postId].likes_count = this.getPosts(this.filter)[postId].likes_count;
    }

}
