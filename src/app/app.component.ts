import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, LoadingController, AlertController, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular/navigation/nav-controller';

import { LoginPage } from '../pages/login/login';
import { ProductSearch } from '../pages/product-search/product-search';
// import { Applications } from '../pages/applications/applications';

import { ApplicationsTabsPage } from '../pages/applications-tabs/applications-tabs';
import { ProductApplication } from '../pages/product-application/product-application';
import { ProductDetails } from '../pages/product-details/product-details';

import { FormsService } from '../services/forms.service';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

import { Product } from '../models/product.model';

import $fh from 'fh-js-sdk';
import * as _ from 'lodash';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  public rootPage: any = LoginPage;
  public prodAppPage: any = ProductApplication;
  public appPage: any = ApplicationsTabsPage;
  public productsPage: any = ProductSearch;
  public prodDetailsPage: any = ProductDetails;
  private loading: any;
  private toastOptions: any;
  // private drawerHeader: string = "assets/images/drawer-graphic.png";
  // private drawerLogo: string = "assets/images/logo.png";
  // private rhLogo: string = "assets/images/rh-logo.png";

  @ViewChild('nav') nav: NavController;

  constructor(
    private platform: Platform,
    public events: Events,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private forms: FormsService,
    private products: ProductService,
    private auth: AuthService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait, loading App...'
    });

    this.toastOptions = {
      message: '',
      // duration: 10000,
      position: 'bottom',
      cssClass: 'toast-styling',
      showCloseButton: true,
      closeButtonText: 'OK'
    };

    this.loading.present();
    this.onFhInit().then(() => {
      this.platform.ready().then((readySource) => {
        console.log('app ready source', readySource);

        if (this.platform.is('android') || this.platform.is('ios')) {
          statusBar.styleDefault();
          statusBar.backgroundColorByHexString('#003e50');
          splashScreen.hide();
        }

        this.handleRouting(this.rootPage);
        this.loading.dismiss();
        this.onReady();
      });
    });
  }

  onFhInit(): Promise<any> {
    let self = this;
    return new Promise((resolve, reject) => {
      $fh.on("fhinit", (err, host) => {
        if (err) {
          console.error("fhinit: ", err);
          self.events.publish('fhinit.failed');
          reject();
        } else {
          console.info("fhinit: ", host);
          self.events.publish('fhinit.success', true);
          resolve();
        }
      });
    });
  }

  parseData(data){
    if(_.isString(data) && data.indexOf('{')>-1){
      var obj = {};
      
      var str = data.replace('{','').replace('}','');
      var strArr = str.split(',');
      
      for (let index = 0; index < strArr.length; index++) {
        var s = strArr[index].split('=');
        obj[s[0].replace(/ /g,'')]=s[1]  
      }
      console.log('parsing ', data);
      console.log('output ', obj);
      return obj;
    } else {
      return data;
    }
  }

  onReady() {
    this.forms.getFormsFromCloud();
    this.products.getProductsFromCloud();


    // setTimeout(() => {  //test notifictions
    //   console.log('ping notification')
    //   this.presentInfoToast( { 
    //     // pushData: {
    //         "alertMessage": "Product Recommendation",
    //         "taskId": 22,
    //         "caseId": 176,
    //         "taskName": "Offer New Product",
    //         "userAlias": 'werwr',
    //         "pushAlias": 'rtyrty',
    //         "data": {
    //           "newProductName": "Clear Platinum Card",
    //           "newProductId": 6
    //         }
    //     // }
    //   }, this.toastOptions, this.prodDetailsPage);
    // }, 10000);

    // let view = this.nav.getActive();
    // console.log('app ready', view.component.name);
    // if (view.component.name !== 'LoginPage') {
    // let payload = {
    //   caseId: 177,
    //   taskName: 'Request Additional Documentation',
    //   taskId: 207
    // };

    // let payload = {
    //   caseId: 171,
    //   taskName: 'Confirm Interview',
    //   taskId: 207
    // };

    // let payload = {
    //   taskName: 'Interview Confirmed',
    //   caseId: 170,
    //   userAlias: "user1",
    //   data: {
    //     "interviewDate": "Tuesday. Sept 5th, 2017, 1:30pm"
    //   }
    // };

    // let payload = {
    //   caseId: 170,
    //   alertMessage: 'Product Recommendation',
    //   data: {
    //       "newProductName": "Clear Platinum Card",
    //       "newProductId": 6
    //   }
    // };

    // setTimeout(() => this.presentTaskToast('Test - Local Dev', {
    //   pushData: payload
    // }, false, this.toastOptions), 10000);

    // setTimeout(() => this.presentInfoToast(payload, this.toastOptions, this.prodDetailsPage), 10000);
    // s
    
    // setTimeout(() => this.presentTaskToast("Action Required", { pushData: payload }, true, this.toastOptions), 10000);
    // setTimeout(() => this.presentInfoToast( payload , this.toastOptions, this.prodDetailsPage), 10000);
    // }

    this.events.subscribe('pushNotification', (evt) => {

      if(evt.payload.data){
        evt.payload.data = this.parseData(evt.payload.data);
      }
      //   // {
      //   //   "alert": "FSI DEMO - Action Required 9",
      //   //   "foreground": true,
      //   //   "payload": {
      //   //       "aerogear-push-id": "00cbc685-5bf8-401f-a078-9dbaf24481df",
      //   //       "alert": "FSI DEMO - Action Required 9",
      //   //       "alertMessage": "FSI DEMO - Action Required 9",
      //   //       "badge": "-1",
      //   //       "caseId": "102",
      //   //       "data": {
      //   //           "field": "ffff"
      //   //       },
      //   //       "taskForm": {
      //   //           "input1": "wqe",
      //   //           "input2": "qweqwe"
      //   //       },
      //   //       "taskId": "207",
      //   //       "taskName": "Request Additional Documentation",
      //   //       "userAlias": "user1"
      //   //   }
      //   // }
      if (evt.payload.caseId && evt.payload.taskId) {
        this.presentTaskToast(evt.alert, { pushData: evt.payload }, false, this.toastOptions);
      } else if (evt.payload.caseId && evt.payload.data && evt.payload.data.interviewDate) {
        this.presentTaskToast(evt.alert, { interviewDate: evt.payload }, true, this.toastOptions);
      } else if (evt.payload.data && evt.payload.data.newProductName) {
        this.presentInfoToast(evt.payload, this.toastOptions, this.prodDetailsPage)
      }
    });
  }



  handleRouting(page: any) {
    this.auth.hasSession().then((valid) => {
      if (valid) {
        page = ProductSearch;
      } else {
        page = LoginPage;
      }
    }, () => {
      page = LoginPage;
    });
  }

  onload(page: any) {
    if (!page) {
      this.presentAlert();
      return;
    }

    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Under Construction!!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  private onToastDismiss(page, payload): void {
    let data: any = {};
    if (payload.interviewDate) {
      return;
    }else if (payload.newProductId) {
      data.id = parseInt(payload.newProductId, 10) || 6;
    } else {
      data = payload;
      data.pushData.disable = true;
    }

    this.nav.push(page, data);
  }

  presentTaskToast(title: string, payload: any, confirmInterview: boolean, opts: any) {
    let msg: string = confirmInterview ? 'INTERVIEW CONFIRMED: ' + payload.interviewDate.data.interviewDate : 'ACTION: ' + payload.pushData.taskName;
    opts.message = msg;
    let toast = this.toastCtrl.create(opts);
    toast.onDidDismiss(() => this.onToastDismiss(this.prodAppPage, payload));
    toast.present();
  }

  presentInfoToast(payload: any, opts: any, page: any) {

    // opts.duration = 5000;
    // delete opts.showCloseButton;
    // delete opts.closeButtonText;

    let msg: string = payload.alertMessage;
    // let productId: number = payload.data.newProductId || 6;
    // this.products.getProductDetails(productId)
    //   .then((details) => {tails.name
        opts.message = msg + ': ' + payload.data.newProductName;
        let toast = this.toastCtrl.create(opts);
        toast.onDidDismiss(() => this.onToastDismiss(page, payload.data));
        toast.present();
      // })
      // .catch(() => console.error('cannot get product'));
  }

  logout(username: string): void {
    this.auth.doLogout(username).then((done) => {
      this.nav.setRoot(LoginPage);
      this.nav.popToRoot();
      this.menuCtrl.enable(false);
    })
  }
}

