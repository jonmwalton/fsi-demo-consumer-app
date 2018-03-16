import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';

import { ProductService } from '../../services/product.service';
import { ProductApplication } from "../product-application/product-application";

import { Product } from '../../models/product.model';


/**
 * Generated class for the ProductDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'product-details'
})

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  private productDetails: Product;

  // @ViewChild(Navbar) navBar: Navbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private products: ProductService
  ) { }

  ngOnInit() {
    let id = this.navParams.get('id') || this.navParams.get('data');
    this.products
      .getProductDetails(id)
      .then((product) => this.productDetails = product)
      .catch(() => console.error('cannot get product: ', id));

  }

  ionViewDidLoad() {
    // this.navBar.backButtonClick = (e: UIEvent) => {
    //   console.log("Back button clicked");
    //   this.navCtrl.parent.viewCtrl.dismiss();
    // };
  }

  startApplication(): void {
    this.navCtrl.push(ProductApplication, { product: this.productDetails });
  }

  presentAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Under Construction!!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showTerms(desc: string): void {
    let alert = this.alertCtrl.create({
      title: 'Terms & Conditions',
      message: desc,
      buttons: ['Ok']
    });
    alert.present();
  }
}
