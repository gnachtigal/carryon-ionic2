import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { PresentationPage } from '../pages/presentation/presentation';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

// Tabs
import { CommunityPage } from '../pages/community/community';
import { ContactsPage } from '../pages/contacts/contacts';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    PresentationPage,
    TabsPage,
    ContactsPage,
    CommunityPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    PresentationPage,
    TabsPage,
    ContactsPage,
    CommunityPage,
  ],
  providers: [StatusBar]
})
export class AppModule {}
