import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Tabs} from 'ionic-angular';

import { TabsContentPage } from '../tabs-content/tabs-content';


/**
 * Generated class for the ApplicationsTabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-applications-tabs',
  templateUrl: 'applications-tabs.html'
})

@IonicPage({
  name: 'applications-home'
})
export class ApplicationsTabsPage {

  private draftsRoot = TabsContentPage;
  private inProgressRoot = TabsContentPage;
  private completedRoot = TabsContentPage;
  private tabNum: number = -1;

  private draftsParams = {
    status: 'Drafts'
  }

  private progressParams = {
    status: 'Open'
  }

  private completedParams = {
    status: 'Complete'
  }

  @ViewChild('tabs') tabs: Tabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController
  ) {
  }

  ngOnInit() {
    console.log('init ', this.tabNum);
  }

  ionViewDidLoad() {
    this.tabNum = this.navParams.get('tabNum');
    if (this.tabNum > -1) {
      this.tabs.select(this.tabNum);
    } else {
      this.tabs.select(1);
    }
    console.log('ionViewDidLoad Applications Tabs Loaded ', this.tabNum);
    
  }

}
