import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  id;
  post;
  date;
  title: String;
  author: String;
  body: String;
  likes;

  constructor(private http: Http, private navParams: NavParams, public navCtrl: NavController) {
    this.http = http;
    this.post = this.getContent(navParams.get('postId'));

  }
    closeModal() {
      this.navCtrl.pop();
    }

  getContent(postId) {
      this.http
        .get('http://localhost:8000/api/post/show/' + postId)
        .map(res => res.json())
        .subscribe(
            data => {
                this.post = data.post;
                this.title = data.post.title;
                this.author = data.post.author.name;
                this.body = data.post.body;
                this.id = data.post.id;
                this.date = this.getParsedDate(data.post.created_at);
                this.likes = data.likes;
                return data.post;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }

  getParsedDate(date) {
      let body = new FormData();
      body.append('date', date);
      this.http
        .post('http://localhost:8000/api/post/getParsedDate', body)
        .map(res => res.json())
        .subscribe(
            data => {
                this.date = data.newDate;
                return data.newDate;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }

  getLikes(postId){
      this.http
        .get('http://localhost:8000/api/post/getLikes/' + postId)
        .map(res => res.json())
        .subscribe(
            data => {
                this.likes = data.likes;
                return data.likes;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );
  }

  likePost(postId){
      this.http
        .get('http://localhost:8000/api/post/likePost/' + postId +  '/' + sessionStorage.getItem('userId'))
        .map(res => res.json())
        .subscribe(
            data => {
                this.likes = data.likes;
                return data.post;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );

  }

  favoritePost(postId){
      this.http
        .get('http://localhost:8000/api/post/favoritePost/' + postId + '/' +  sessionStorage.getItem('userId'))
        .map(res => res.json())
        .subscribe(
            data => {
                return data;
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );

      // this.posts[postId].likes_count = this.getPosts(this.filter)[postId].likes_count;
  }
}
