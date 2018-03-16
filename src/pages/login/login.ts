import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Device } from '@ionic-native/device';

import { AuthService } from  '../../services/auth.service';

import { LoginModel } from '../../models/login.model';
import { ProductSearch } from '../../pages/product-search/product-search';

import { PushNotificationsService } from '../../services/push-notifications.service';
import { ApplicationsService } from '../../services/applications.service';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'login',
  priority: 'high'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  // public logo: string = './assets/images/logo.png';
  public cred: LoginModel = {
    id: '',
    username: 'user1',
    password: 'pass'
  };

  constructor(
    private authService: AuthService,
    private device: Device,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private notificationsService: PushNotificationsService,
    private applications: ApplicationsService,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(cred: LoginModel): void {
    this.authService.doAuth(cred).then((success) => {
      if(success) {
        // this.applications.getApplicationsFromCloud(this.cred.username) // make this call in tab-content.ts

        if(this.device.uuid) {
          this.authService.setDevice(this.device.uuid);
          this.notificationsService.registerForPush(this.device.uuid); //register for push using username as alias
        } else {
          this.notificationsService.registerForPush(this.cred.username);
        }
        this.navCtrl.setRoot(ProductSearch);
      } else {
        this.presentAlert()
      }
    }, (fail) => this.presentAlert());
  }

  presentAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Authentication Failed.',
      message: 'Username or password provided is incorrect. Please try again or contact support.',
      buttons: ['Dismiss']
    });
    console.error('ERROR: Authentication Failed!!')
    alert.present();
  }
}
