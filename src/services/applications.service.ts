import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { RequestService } from "./request.service";
import { ProductSubmission } from '../models/product-submission.model';
import { UtilsService } from './utils.service';
import { Case } from '../models/case.model';

import _ from 'lodash';


@Injectable()
export class ApplicationsService {

  // private products: any;
  private inMemStore: Case[];
  private applications: any;
  private key: string = 'DRAFT_APPLICATIONS';
  private caseData: any;

  constructor(
    private cloud: RequestService,
    private storage: Storage,
    private utils: UtilsService
  ) {
    this.inMemStore = [];
    this.caseData = {};
  }

  getApplicationsFromCloud(user: string): any {
    return new Promise((resolve, reject) => {
      let self = this;
      this.cloud.doGet('/application/user/' + user, null)
        .subscribe(
          (data) => {
            self.applications = data
            resolve(data);
          },
          (err) => {
            console.error("ERROR", err.toString())
            self.applications = {
              count: 0,
              list: []
            }
            reject(err)
          }
        )
    })
  }

  getCaseFromCloud(id: number): any {
    return new Promise((resolve, reject) => {
      this.cloud.doGet('/application/id/' + id, null)
        .subscribe(
        (data) =>resolve(data),
        (err) => reject(err)
        )
    })

  }

  getCase(): any {
    return _.map(this.caseData.list, 'fields');
  }

  submitApplication(data: Case): Promise<any> {
    return new Promise((resolve, reject) => {
      let _data = this.utils.addDefaults(data);
      this.cloud.doPost("/application", _data)
        .subscribe(
          (data) => resolve(data),
          (err) => reject(err)
        )
    })
  }

  uploadFile(data: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cloud.doPost("/application/file", data)
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        )
    })
  }

  getApplications(): any {
    return this.applications;
  }

  getApplicationsByStatus(status: string): any[] {
    let data = this.applications.list;
    data = _.map(data, 'fields');
    let list = data.filter((item) => {
      return item.status = status;
    });

    return list;
  }

  runTask(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cloud.doPost('/bpm/runTask', params)
        .subscribe(
        (data) => resolve(data),
        (err) => reject(err)
        )
    })
  }

  getImageData(guid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cloud.doGet('/application/file/' + guid, null)
        .subscribe(
        (file) => resolve(file),
        (err) => reject(err)
        )
    })
  }

  saveDrafts(data: Case): void {
    let key = this.key;
    let store = this.storage;
    let self = this;

    if (this.inMemStore && this.inMemStore.length > 0) {
      this.inMemStore.filter((app) => {
        if (!_.isEqual(app, data)) {
          self.inMemStore.push(data);
          store.set(key, self.inMemStore);
        }
      });
    } else {
      this.inMemStore.push(data);
      store.set(key, this.inMemStore);
    }
  }

  loadDrafts(): Promise<Case[]> {
    let key = this.key;
    let store = this.storage;
    return store.get(key);
  }

  deleteDraftItem(data: Case): void {
    this.loadDrafts().then((store) => store.splice(_.indexOf(store, data), 1));
  }
  
}

