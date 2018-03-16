import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ProductSearch } from '../pages/product-search/product-search';
import { ProductDetails } from '../pages/product-details/product-details';
import { ProductApplication } from '../pages/product-application/product-application';
// import { Applications } from '../pages/applications/applications';

import { ApplicationsTabsPage } from '../pages/applications-tabs/applications-tabs';
// import { ApplicationDetails } from '../pages/application-details/application-details';
import { LoginPage } from '../pages/login/login';
// import { RunTask } from '../pages/run-task/run-task';
import { TabsContentPage } from '../pages/tabs-content/tabs-content';
import { ImageReviewPage } from '../pages/image-review/image-review';


import { FormsService } from '../services/forms.service';
import { RequestService } from '../services/request.service';
import { ProductService } from '../services/product.service';
import { ApplicationsService } from '../services/applications.service';
import { PushNotificationsService } from '../services/push-notifications.service';
import { SyncService } from '../services/sync.service';
import { CaseMgmtService } from '../services/case.mgmt.service';
import { UtilsService } from '../services/utils.service';

import { IMAGE } from '../models/mock/mock-image';

import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { SearchPipe } from '../pipes/search/search';
import { StatusPipe } from '../pipes/status/status';
import { ParamsService } from '../services/params.service';

class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve(IMAGE);
    })
  }
}


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    // Applications,
    // ApplicationDetails,
    ApplicationsTabsPage,
    ProductSearch,
    ProductDetails,
    ProductApplication,
    // RunTask,
    SearchPipe,
    TabsContentPage,
    StatusPipe,
    ImageReviewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false,
      menuType: 'overlay',
      backButtonIcon: 'fsi-icon-back',
      backButtonText: '',
      tabsHighlight: true,
      tabsPlacement: 'top',
      platforms: {
        android: {
          tabsPlacement: 'top'
        },
        ios: {
          tabsPlacement: 'top'
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    // Applications,
    // ApplicationDetails,
    ProductSearch,
    ProductDetails,
    ProductApplication,
    // RunTask,
    ApplicationsTabsPage,
    TabsContentPage,
    ImageReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FormsService,
    RequestService,
    ProductService,
    ApplicationsService,
    PushNotificationsService,
    SyncService,
    CaseMgmtService,
    UtilsService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    Camera,
    Device,
    // {
      // provide: Camera,
      // useClass: CameraMock
    // },
    AuthService,
    ParamsService
  ]
})
export class AppModule { }
