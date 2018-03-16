import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';

import { ApplicationsService } from '../../services/applications.service';
import { AuthService } from '../../services/auth.service';

// import { ApplicationDetails } from '../application-details/application-details';
import { ProductApplication } from '../product-application/product-application';

// import { RunTask } from '../run-task/run-task';

import _ from 'lodash';
/**
 * Generated class for the TabsContentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'applications-tab-content'
})
@Component({
  selector: 'page-tabs-content',
  templateUrl: 'tabs-content.html',
})
export class TabsContentPage {

  private applications: any = [];
  private pushData: any;
  private interviewDate: any;
  private loading: any;
  private tab: any;
  private isDraft: boolean = false;
  private isComplete: boolean = false;
  private filter: string;

  // @ViewChild('myTabs') tabRef: Tabs;

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private applicationsService: ApplicationsService,
    private auth: AuthService
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait, loading Applications...'
    });
  }

  ngOnInit() {
    this.showLoading();
    // this.applicationsService.getApplicationsFromCloud(this.auth.getUserName())
    //   .then((res) => {
    //     this.initTab();
    //   })
    //   .catch((err) => {
    //     this.initTab();
    //   })

    this.filter = this.navParams.get('status');
    this.tab = this.navCtrl.getActive();

    let id = this.tab.id;
    console.log('tabTitle==' + this.filter);

    if (this.filter === 'Drafts') {
      this.isDraft = true;
    } else if (this.filter === 'Complete') {
      this.isComplete = true;
    }

    this.getTabData(this.filter);
    // this.handlePushNotifications();
  }

  getApplications(): any[] {
    let data: any = this.applicationsService.getApplications();
    data = _.map(data.list, 'fields') || [];
    data = _.orderBy(data, ['dateCreated'], ['desc']) || [];
    return data;
  }

  getTabData(id: string) {

    
    switch (id) {
      case 'Drafts': {

        this.applicationsService
          .loadDrafts()
            .then((drafts) => {
              this.applications = drafts;
              console.log('loaded draft', this.applications);
              this.hideLoading();
            })
            .catch((err) => {
              this.applications = [];
              console.log('draft err', err);
              this.hideLoading();
            });
        break;

      }
      case 'Complete':
      case 'Open': {
        this.applicationsService.getApplicationsFromCloud(this.auth.getUserName())
          .then((res) => {
            this.initLoadedApplications(id);
          })
          .catch((err) => {
            this.initLoadedApplications(id);
          })

        // this.hideLoading();
        break;
      }
      // case 'Complete': {
      //   this.applications = this.filterApplicationsByStatus('Complete');
      //   // this.hideLoading();
      //   break;
      // }
    }

  }

  initLoadedApplications(id){
    this.applications = this.getApplications();
    this.applications = this.filterApplicationsByStatus(id);
    if (id==='Open') {
      let groupedData = _.groupBy(this.applications, 'currentTaskOwner');
      this.applications = [];
      // make sure applicant is always first
      if(groupedData.Applicant){
        this.applications[0] = {Applicant: groupedData.Applicant}
        delete groupedData.Applicant;
      }
      for (let key in groupedData) {
        let newData = {};
        newData[key] = groupedData[key];
        this.applications.push(newData);
      }
    }
    this.hideLoading();
  }

  determineCurrentTaskAction(app: any): string {
    let interViewTask: string = 'Confirm Interview';
    let requestDocsTask: string = 'Request Additional Documentation';
    // return (app.currentTaskName === interViewTask ? interViewTask : requestDocsTask);
    return app.currentTaskName;
  }

  getGroupTitle(list: any): string {
    if (list.Applicant) {
      return 'Requires my Action';
    } else if (list.Bank) {
      return 'With Application Administrator';
    }
  }

  // presentAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Application',
  //     subTitle: 'Under Construction!!',
  //     message: 'This application is currently under revei'
  //     buttons: ['Dismiss']
  //   });
  //   alert.present();
  // }

  viewApplication(app: any) {
    let nav = this.app.getRootNav();
    nav.push(ProductApplication, {
      data: {
        app: app,
        disable: true
      }
    });
  }

  runTask(app: any) {
    let nav = this.app.getRootNav();
    nav.push(ProductApplication, {
      pushData: {
        caseId: app.caseId,
        taskId: app.currentTaskId,
        taskName: this.determineCurrentTaskAction(app),
        disable: true
      }
    });
  }

  openDraft(draftApplication: any): void {
    let nav = this.app.getRootNav();
    nav.push(ProductApplication, { 
      data: {
        app: draftApplication,
        disable: false
      }
    });
  }

  filterApplicationsByStatus(status: string): any[] {
    let data = this.applications;
    this.applications = [];
    this.applications = data.filter((item) => item.status === status)
    return this.applications;
  }

  showLoading() {
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  isActionRequired(task: any): boolean {
    return (task.status === 'Open' && task.currentTaskOwner === 'Applicant')
  }

  isApplicationUnderReview(task: any): boolean {
    return (task.status === 'Open' && task.currentTaskOwner === 'Bank')
  }

  showRequiredActions(task: any) {
    return !this.isDraft && this.isActionRequired(task)
  }

  // handlePushNotifications() {
  //   this.pushData = this.navParams.get('pushData');
  //   this.interviewDate = this.navParams.get('interviewDate');
  //   if (this.pushData) {
  //     //handle run task
  //     let app = _.filter(this.applications, { "caseId": parseInt(this.pushData.caseId, 10) });
  //     if (app && _.isArray(app) && app.length === 1) {
  //       this.navCtrl.push(RunTask, { application: app[0] });
  //     }
  //   } else if (this.interviewDate) {
  //     //handel interview confirmed
  //     let app = _.filter(this.applications, { "caseId": parseInt(this.interviewDate.caseId, 10) });
  //     if (app && _.isArray(app) && app.length === 1) {
  //       this.navCtrl.push(ApplicationDetails, { application: app[0] });
  //     }
  //   }
  // }

}
