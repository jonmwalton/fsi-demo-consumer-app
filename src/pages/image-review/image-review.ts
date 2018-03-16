import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { File } from '../../models/submission/file.model';

/**
 * Generated class for the ImageReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-image-review',
  templateUrl: 'image-review.html',
})
export class ImageReviewPage {

  private file: any;
  private btnLabel: string = 'UPLOAD';

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.file = this.navParams.get('file');

    if (this.file.userConfirmed === true) {
      this.btnLabel = 'BACK';
    }
  }

  ionViewDidLoad() {
    this.file = this.navParams.get('file');
    console.log('ionViewDidLoad ImageReviewPage');
  }

  dismiss(): void {
    if (this.btnLabel === 'UPLOAD') {
      this.file.userConfirmed = true;
      this.viewCtrl.dismiss(this.file);
    } else {
      this.viewCtrl.dismiss();
    }
  }
}
