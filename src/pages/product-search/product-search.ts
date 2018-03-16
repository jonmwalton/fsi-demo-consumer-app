import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ProductService } from "../../services/product.service";
import { ProductDetails } from "../product-details/product-details";

import { Product } from '../../models/product.model';

import _ from 'lodash';

/**
 * Generated class for the ProductSearch page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'products-home'
})
@Component({
  selector: 'page-product-search',
  templateUrl: 'product-search.html'
})
export class ProductSearch {

  private products: any[] = []
  private term: any;
  public showCancel: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private productService: ProductService
  ) { }

  ionViewCanEnter() { }

  ionViewDidLoad() {
    this.getProducts();
    this.menuCtrl.enable(true);
  }

  viewProduct(product: any) {
    // debugger
    this.navCtrl.push(ProductDetails, { id: product.id });
  }

  hasContent(): boolean {
    return (this.products && this.products.length > 0);
  }

  getProducts(): void {
    let data = this.productService.getProducts();
    let groups = _.groupBy(data, 'type');
    for (let key in groups) {
      let newData = {};
      newData[key] = groups[key];
      this.products.push(newData);
    }
  }

  getGroupTitle(productType: any): string {
    if (productType.loan) {
      return 'Loans';
    }

    if (productType.card) {
      return 'Credit Card';
    }

    if (productType.credit) {
      return 'Credit';
    }
  }

  onOpenMenu() {
    this.menuCtrl.open();
  }

  searchProducts(evt) {
    this.term = evt.target.value;
  }

  onCancel(evt) {
    this.term = '';
    this.getProducts();
  }
}
