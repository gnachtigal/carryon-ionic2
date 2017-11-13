import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { CommunityPage } from '../community/community';
import { ContactsPage } from '../contacts/contacts';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html',
  selector: 'page-tabs',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CommunityPage;
  tab3Root = ContactsPage;

  id: number;
  name: string;
  email: string;

 constructor(public navCtrl: NavController, private navParams: NavParams) {
  this.id = navParams.get('id');
  this.name = navParams.get('name');
  this.email = navParams.get('email');
 }

}
