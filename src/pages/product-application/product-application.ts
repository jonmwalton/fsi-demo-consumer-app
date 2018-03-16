import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Slides, Navbar, ModalController } from 'ionic-angular';
// import { FormsService } from '../../services/forms.service';
import { AuthService } from '../../services/auth.service';
import { ApplicationsService } from '../../services/applications.service';
import { MenuController, AlertController, LoadingController } from 'ionic-angular';

import { COUNTRIES } from '../../models/mock/countries';

import { Product } from '../../models/product.model';
import { File } from '../../models/submission/file.model';
import { Case } from '../../models/case.model';
import { Application } from '../../models/submission/application.model';

import { ApplicationsTabsPage } from '../../pages/applications-tabs/applications-tabs';
import { ProductSearch } from '../../pages/product-search/product-search';
import { ImageReviewPage } from '../../pages/image-review/image-review';

import { Camera, CameraOptions } from '@ionic-native/camera';

import _ from 'lodash';
/**
 * Generated class for the ProductApplication page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'product-application'
})

@Component({
  selector: 'page-product-application',
  templateUrl: 'product-application.html',
})
export class ProductApplication {

  @ViewChild(Slides) slides: Slides;
  @ViewChild(Navbar) navBar: Navbar;

  private forms: any;
  private countries: any;
  private data: any;
  private openCase: any;
  private application: any;
  private productDetails: any;
  private useProFileData: boolean = false;
  private personalDetailsForm: FormGroup;
  private financialInformationForm: FormGroup;
  private employmentDetailsForm: FormGroup;
  private mortgageDetailsForm: FormGroup;
  private slideIndex: number = 0;
  private showSubmit: boolean = false;
  private reqDocUpload: boolean;
  private confirmInterview: boolean;
  private interviewDate: any = "";
  private loading: any;
  private slideTitle: string;
  private disable: false;
  private navigateTo: any  = ProductSearch; //default
  private showSubmitDocs:boolean  = false; //default
  private showSubmitDate: boolean  = false; //default
  private navComplete: boolean = false;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private applicationsService: ApplicationsService,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private modal: ModalController,
    private authService: AuthService
  ) {
    this.countries = COUNTRIES;
    this.reqDocUpload = false;
    this.confirmInterview = false;
    this.openCase = {};

    this.loading = this.loadingCtrl.create({
      content: 'Please wait, loading...'
    });
  }

  ionViewWillEnter() {
    console.log('product applicaton page  -  ionViewWillEnter')
    let self = this;
    this.showLoading();
 
    this.setViewData(this.navParams)
      .then((caseData) => {

        self.data = caseData;
        if (self.validateApplicationModel(self.data)) {
          self.createApplication();
          self.setupForms();
          self.updateSlideTitle();
          // self.hideLoading();
          console.log('product applicaton page  -  ionViewWillEnter( finished')
          if (this.slides.length()>5 && this.navComplete===false){
            console.log('do nav from ionViewWillEnter')
            this.goToPage(); 
          } else {
            setTimeout(() => {
              if(this.navComplete===false) {
                console.log('do nav from ionViewWillEnter after delay')
                this.goToPage()
              }  
            }, 300);
          }

          // if (self.reqDocUpload) {

          //   if (self.confirmInterview) {
          //     self.addSlide();
          //     setTimeout(() => self.slideTo(6), 0);
          //     // self.slideTo(6)
          //   } else {
          //     self.addSlide();
          //     setTimeout(() => self.slideTo(5), 0);
          //     // self.slideTo(5)
          //   }
          // }
        } else {
          console.error('validation error')
          self.hideLoading();
        }
      })
      .catch((err) => {
        console.error(err.toString())
        self.hideLoading();
      });
  }

  goToPage() {
    if (this.reqDocUpload) {
      this.navComplete = true;
      if (this.confirmInterview) {
        // this.addSlide();
        // setTimeout(() => this.slideTo(6), 200);
        this.slideTo(6)
      } else {
        // this.addSlide();
        // setTimeout(() => this.slideTo(5), 200);
        this.slideTo(5)
      }
    }
  }

  ionViewDidEnter() {
    console.log('product applicaton page  - ionViewDidEnter')
    if (this.slides.length()>5){
      console.log('do nav from ionViewDidEnter ')
      this.goToPage();
    }
    this.hideLoading();
  }

  showLoading() {
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  setViewData(params: NavParams): Promise<any> {
    let self = this;

    return new Promise((resolve, reject) => {
      if (params.get('product')) {
        let product: Product = params.get('product');
        this.navigateTo = ProductSearch;
        resolve(product);
      } else if (params.get('pushData')) {  
        let caseData: any = params.get('pushData');
        this.disable = caseData.disable;
        this.navigateTo = ApplicationsTabsPage;
        this.applicationsService.getCaseFromCloud(caseData.caseId)
          .then((data) => {
            let app = (_.map(data.list, 'fields') || [])
            console.log('back from call')
            self.openCase = app[0];
            console.log('getCaseById ', caseData);
            self.handlePushMsgEvent(caseData);
            resolve(self.openCase)
          })
          .catch((err) => {
            console.error(err.toString())
            reject(err);
          });
      } else {
        let application = params.get('data');
        this.navigateTo = ApplicationsTabsPage;
        this.disable = application.disable;
        console.log('editing disabled: ', this.disable);
        resolve(application.app);
      }
    });
  }

  submitInterviewDate(e: UIEvent): void {
    this.interviewDate = e;
    this.showSubmitDate = true;
  }

  submitTask(task:string): void {
    let taskData = {};
    if (task==='Docs') {
      taskData = {
        uploadedDocuments: this.getUploadedFileGUID()
      }
    } else if (task==='Docs') {
      taskData = {
        interviewDate: this.interviewDate
      }
    }
    this.applicationsService
      .runTask({
        taskId: this.data.currentTaskId,
        caseId: this.data.caseId,
        data: taskData
      })
      .then((data) => {
        console.log(data)
        this.navCtrl.setRoot(ApplicationsTabsPage);
      })
      .catch((err) => {
        console.error(err)
        this.presentAlert('Unable to Complete Task', 'Please try again later')
      })
  }

  // submitDocumentsTask(): void {
  //   this.applicationsService
  //     .runTask({
  //       taskId: this.data.currentTaskId,
  //       caseId: this.data.caseId,
  //       data: {
  //         uploadedDocuments: this.getUploadedFileGUID()
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  getUploadedFileGUID(): any[] {
    let files: any = this.data.Application.files;
    let ret: any = [];
    _.each(files, (file) => file && file.uploaded === true ? ret.push(file.guid) : null);
    return ret;
  }

  isProductModel(d: any): boolean {
    return (d.name && d.terms && d.requiredDocuments);
  }

  validateApplicationModel(d: any): boolean {
    return ((d.application && !d.application.files) || (d.Application && !d.Application.files)
      || d.status === "Draft" || this.isProductModel(d));
  }

  handlePushMsgEvent(pushData: any): void {
    console.log('handlePushMsgEvent start')
    let self = this;

    switch (pushData.taskName) {
      case "Request Additional Documentation": {
        self.reqDocUpload = true;
        // this.addSlide();
        break;
      }
      case "Confirm Interview": {
        self.reqDocUpload = true;
        // this.addSlide();
        self.confirmInterview = true;
        // this.addSlide();
        break;
      }
      
    }
  }


  getCaseById(caseId: number): void {
    let self = this;
    this.applicationsService
      .getCaseFromCloud(caseId)
      .then((caseData) => {
        let app = (_.map(caseData.list, 'fields') || [])
        console.log('back from call')
        self.openCase = app[0];
      })
      .catch((err) => console.error(err.toString()));
  }


  handleNewApplication(app: Case, d: any): Case {
    app.applicationType = d.category.toUpperCase();
    app.productObj = d;
    app.Application.productType = d.productType.toUpperCase();
    app.Application.productName = d.name;
    app.productId = d.id;
    return app;
  }

  handleExistingApplication(app: Case, d: any): Case {
    // get product details form case obj
    app.applicantName = d.applicantName;
    app.dateCreated = d.dateCreated;
    app.caseId = d.caseId;
    app.status = d.status;
    app.currentTaskId = d.currentTaskId;
    app.applicationType = d.ApplicationType;
    app.currentTaskOwner = d.currentTaskOwner;
    app.currentTaskName = d.currentTaskName;
    app.currentTaskForm = d.currentTaskForm;
    app.currentTaskStatus = d.currentTaskStatus;
    app.additionalDocsRequired = d.additionalDocsRequired;
    app.assignedTo = d.assignedTo;
    app.productObj = d.productObj;
    app.uploadedDocuments = d.uploadedDocuments;
    app.Application.personalDetails = d.Application.personalDetails;
    app.Application.financialInformation = d.Application.financialInformation;
    app.Application.employmentDetails = d.Application.employmentDetails;
    app.Application.creditDetails = d.Application.creditDetails;
    app.Application.companyDetails = d.Application.companyDetails;
    if (d.Application.mortgageDetails) app.Application.mortgageDetails = d.Application.mortgageDetails;
    app.Application.productType = d.productObj.type;
    app.Application.productName = d.productObj.name;
    app.Application.productId = d.productObj.id;
    app.productId = d.productId;
    return app;
  }

  createApplication(): void {
    let app = new Case();
    let data = this.data;
    app.userAlias = this.authService.getUserName();
    app.pushAlias = this.authService.getDevice() || this.authService.getUserName();
    if (this.isProductModel(data)) {
      this.data = this.handleNewApplication(app, data);
    } else {
      this.data = this.handleExistingApplication(app, data);
    }
  }

  disableSwipe(idx: number) {
    // if (idx === 5) {
    //   this.slides.lockSwipes(true);
    // } else if (idx === 6) {
    //   this.slides.lockSwipes(true);
    // } else {
    // this.slides.lockSwipes(false);
    // }
  }

  setCameraOptions(): CameraOptions {
    return {
      quality: 100,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
  }

  displayImageReview(fileData: File): void {
    let self = this;
    let imgViewer = this.modal.create(ImageReviewPage, { file: fileData });
    let files = this.data.Application.files;

    imgViewer.onDidDismiss(data => {
      if (data) {
        files.push(data);
      }
      _.each(files, (file) => file && file.uploaded === false ? this.fileUpload(file) : null)
    });
    imgViewer.present();
  }

  fileUpload(fileData: any): void {
    let files = this.data.Application.files;

    if (fileData.uploaded === false) {
      this.applicationsService
        .uploadFile(fileData)
        .then((res) => {
          console.log('file uploaded ok ', res.guid)
          this.showSubmitDocs = true;
          this.data.Application.files.splice(_.findIndex(files, { id: res.id }), 1, res)
        })
        .catch((err) => {
          console.error(err)
          this.presentAlert('Unable to Upload Photo', 'Try using smaller photo')
        });
    }
  }

  takePhoto(): void {
    let opts = this.setCameraOptions();
    let self = this;
    this.camera
      .getPicture(opts)
      .then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        let file = new File(base64Image, 'Photo', this.data.caseId);
        self.displayImageReview(file);
      }, (err) => {
        console.error('camera: ', err.toString())
      })
  }

  openPhotoLib(): void {
    let opts = this.setCameraOptions();
    opts.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
    let self = this;

    this.camera
      .getPicture(opts)
      .then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        let file = new File(base64Image, 'Attachment', this.data.caseId);
        self.displayImageReview(file);
      }, (err) => {
        console.error('camera: ', err.toString())
      })
  }

  ionViewDidLoad() {
    let self = this;
    this.navBar.backButtonClick = (e: UIEvent) => {
      self.saveApplicationDialog();
    }
  }

  nextSlide(): void {
    this.slides.slideNext();
  }

  prevSlide(): void {
    this.slides.slidePrev();
  }

  slideTo(idx: number): void {
    this.slides.slideTo(idx);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('updateSlideTitle ', currentIndex)
    this.slideIndex = currentIndex;
    this.disableSwipe(this.slideIndex);
    this.updateSlideTitle();
  }

  addSlide(): void {
    this.slides.update();
  }

  showDocumentUpload(): boolean {
    return this.data && this.data.files && this.reqDocUpload;
  }

  setupForms(): void {
    let fb = this.formBuilder;
    let useProfileData = this.data.Application.useProfileData;
    let personal = this.data.Application.personalDetails;
    let finance = this.data.Application.financialInformation;
    let employment = this.data.Application.employmentDetails;
    let mortgage = this.data.Application.mortgageDetails;

    this.personalDetailsForm = fb.group({
      useProfileData: [true],
      name: fb.group({
        salutation: [{value: personal.name.salutation, disabled: this.disable} ],
        givenName: [{value: personal.name.givenName, disabled: this.disable} ],
        middleName: [{value: personal.name.middleName, disabled: this.disable} ],
        surname: [{value: personal.name.surname, disabled: this.disable} ],
      }),
      demographics: fb.group({
        // gender: [personal.demographics.gender],
        dateOfBirth: [{value: personal.demographics.dateOfBirth, disabled: this.disable} ],
        birthPlace: [{value: personal.demographics.birthPlace, disabled: this.disable} ],
        countryOfBirth: [{value: personal.demographics.countryOfBirth, disabled: this.disable} ]
      })
    });

    this.financialInformationForm = fb.group({
      hasForeseeableFinancialChanges: [{value: finance.hasForeseeableFinancialChanges, disabled: this.disable} ],
      nonBankDebtObligationFlag: [{value: finance.nonBankDebtObligationFlag, disabled: this.disable} ],
      incomeDetails: fb.group({
        frequency: [{value: finance.incomeDetails[0].frequency, disabled: this.disable} ],
        variableAmount: [{value: finance.incomeDetails[0].variableAmount, disabled: this.disable} ],
        incomeType: [{value: finance.incomeDetails[0].incomeType, disabled: this.disable} ],
        fixedAmount: [{value: finance.incomeDetails[0].fixedAmount, disabled: this.disable} ]
      })
    });

    this.employmentDetailsForm = fb.group({
      jobTitle: [{value: employment[0].jobTitle, disabled: this.disable} ],
      employerName: [{value: employment[0].employerName, disabled: this.disable} ],
      employmentDuration: [{value: employment[0].employmentDurationInYears + '', disabled: this.disable} ],
      employmentStatus: [{value: employment[0].employmentStatus, disabled: this.disable} ]
    });

    this.mortgageDetailsForm = fb.group({
      type: [{value: mortgage.type, disabled: this.disable} ],
      location: [{value: mortgage.location, disabled: this.disable} ],
      propertyValue: [{value: mortgage.propertyValue, disabled: this.disable} ],
      amount: [{value: mortgage.amount, disabled: this.disable} ],
      deposit: [{value: mortgage.deposit, disabled: this.disable} ],
      term: [{value: mortgage.term, disabled: this.disable} ]
    });

  }

  isValidSubmission(): boolean {
    return (this.personalDetailsForm.valid
      && this.financialInformationForm.valid
      && this.employmentDetailsForm.valid
      && this.mortgageDetailsForm.valid);
  }

  buildSubmissionPayload(): Case {
    let app = this.data.Application;

    let personal = this.personalDetailsForm.value;
    app.personalDetails = {
      name: {
        salutation: personal.name.salutation,
        givenName: personal.name.givenName,
        middleName: personal.name.middleName,
        surname: personal.name.surname
      },
      demographics: {
        gender: personal.demographics.gender,
        dateOfBirth: personal.demographics.dateOfBirth,
        birthPlace: personal.demographics.birthPlace,
        countryOfBirth: personal.demographics.countryOfBirth
      }
    };

    let financial = this.financialInformationForm.value;
    app.financialInformation = {
      hasForeseeableFinancialChanges: financial.hasForeseeableFinancialChanges,
      nonBankDebtObligationFlag: financial.nonBankDebtObligationFlag,
      incomeDetails: [{
        incomeType: financial.incomeDetails.incomeType,
        variableAmount: financial.incomeDetails.variableAmount,
        frequency: financial.incomeDetails.frequency,
        fixedAmount: financial.incomeDetails.fixedAmount
      }],
    };

    let mortgage = this.mortgageDetailsForm.value;
    app.mortgageDetails = {
      type: mortgage.type,
      location: mortgage.location,
      propertyValue: mortgage.propertyValue,
      amount: mortgage.amount,
      deposit: mortgage.deposit,
      term: mortgage.term
    };

    let employment = this.employmentDetailsForm.value;
    app.employmentDetails = [{
      employerName: employment.employerName,
      jobTitle: employment.jobTitle,
      employmentDuration: employment.employmentDuration,
      employmentStatus: employment.employmentStatus
    }];
    return this.data;
  }

  saveSubmission(): void {
    let payload = this.buildSubmissionPayload();
    this.applicationsService.saveDrafts(payload);
    this.navCtrl.setRoot(this.navigateTo, {tabNum: 0});
  }

  onSubmit(): void {
    let payload = this.buildSubmissionPayload();
    this.applicationsService.submitApplication(payload)
      .then((data)=>{
        console.info('Submitted OK ', data)
        this.navCtrl.setRoot(ApplicationsTabsPage);
      })
      .catch((err) => {
        console.error('Submission Failed ', err)
        this.presentAlert('Product Submission Failed', 'Please again try later')
      })
  }

  updateSlideTitle() {
    let slideIndex = this.slides.getActiveIndex()
    let newTitle: string = '';
    let title: string = '';
    switch (slideIndex) {
      case 0: {
        title = this.data && this.data.name ? this.data.name : this.data.productObj.name;
        newTitle = title + ' Application';
        break;
      }
      case 1: {
        newTitle = 'Personal Details';
        break;
      }
      case 2: {
        newTitle = 'Financial Information';
        break;
      }
      case 3: {
        newTitle = 'Employment Details';
        break;
      }
      case 4: {
        newTitle = 'Home Loan Details';
        break;
      }
      case 5: {
        if(this.showDocumentUpload()){ // stop title change it doc upload not active
          newTitle = 'Document Uploads';
        } else {
          newTitle = 'Home Loan Details';
        }
        break;
      }
      case 6: {
        newTitle = 'Confirm Interview';
        break;
      }
      default: {
        newTitle = 'Product Application Process';
      }
    }
    this.slideTitle =  newTitle;
  }

  presentAlert(subTitle:string, message:string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: subTitle,
      message: message,
      buttons: ['DISMISS']
    });
    alert.present();
  }

  saveApplicationDialog() {
    if(this.disable){
      this.navCtrl.setRoot(ApplicationsTabsPage);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Save Application?',
        message: 'Do you wish to save application to complete at a later date?',
        enableBackdropDismiss: false,
        buttons: [{
          text: 'DISCARD',
          role: 'cancel',
          handler: () => {
            this.navCtrl.setRoot(this.navigateTo, {tabNum: 0});
          }
        }, {
          text: 'SAVE',
          handler: () => this.saveSubmission()
        }]
      });
      alert.present();
    }
  }

  deleteApplicationDialog() {
    let alert = this.alertCtrl.create({
      title: 'Remove Product',
      message: 'An application requires a product to continue. Removing product will result in the application being cancelled. Are you sure you wish to cancel this application?',
      buttons: [{
        text: 'NO',
        role: 'cancel',
        handler: () => {
          this.navCtrl.setRoot(ProductSearch);
        }
      }, {
        text: 'YES',
        handler: () => {
          this.applicationsService.deleteDraftItem(this.data);
          this.navCtrl.setRoot(ProductSearch);
        }
      }]
    });
    alert.present();
  }
}
