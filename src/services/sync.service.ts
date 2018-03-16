import { Injectable } from "@angular/core";
import { Http, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
// import { Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/Rx';
import $fh from 'fh-js-sdk';

// import { Recipe } from "../models/recipe";
// import { Ingredient } from "../models/ingredient";
// import { AuthService } from "./auth";

@Injectable()
export class SyncService {

  defaultConfig : Object = {
    'sync_frequency': 20,
    'do_console_log': false,
    'auto_sync_local_updates': false, // update immediately on saving - could overload queues
    'crashed_count_wait': 2,
    'storage_strategy': 'html5-filesystem' // 'dom'
  };

  constructor(public events: Events) {

    // events.subscribe('syncEvent.Cases', (syncEvent) => {
    //   // user and time are the same arguments passed in `events.publish(user, time)`
    //   console.log('Got case event:: ', syncEvent.code);
    //   console.log(JSON.stringify(syncEvent));
    // });
  }

  notifyDataChange(syncEvent: any): void {
    // var sEvent = 'syncEvent.' + syncEvent.dataset_id + '.' + syncEvent.code;

    var sEvent = 'syncEvent.' + syncEvent.dataset_id;
    console.log('SYNC EVENT: ' + sEvent);

    this.events.publish(sEvent, syncEvent);
    // $rootScope.$broadcast(sEvent, syncEvent);
  };

  startSync(): void {

    console.log('Starting sync service');

    this.init();
    this.manage('Cases');
  }

  manage(datasetName: string): void {
    var opts = {};
    var params = {};
    var metaData = {};

    console.log('Managing dataset %s', datasetName);

    $fh.sync.manage(datasetName, opts, params, metaData, function () {

    });
  }

  init(): void {
    $fh.sync.init(this.defaultConfig);

    var that = this;
    $fh.sync.notify(function (e) {
      that.notifyDataChange(e);

      switch (e.code) {
        case 'client_storage_failed':
          console.error('FATAL.ERROR', 'client_storage_failed');
          break;
        case 'remote_update_failed':
          console.error('remote_update_failed ' + JSON.stringify(e));
          break;
        case 'sync_failed':
          console.warn('sync_failed ' + JSON.stringify(e));
          break;
      }
    });
  }



  doList(dataset: any, success:any, failure: any): void {
    $fh.sync.doList(dataset, success, failure);
  }

  doCreate(dataset_id: any, data:any, success: any, failure: any): void {
    $fh.sync.doCreate(dataset_id, data, success, failure);
  }

  doRead(dataset_id: any, uid:any, success: any, failure: any): void {
    $fh.sync.doRead(dataset_id, uid, success, failure);
  }

  doUpdate(dataset_id: any, uid:any, data: any, success: any, failure: any): void {
    $fh.sync.doUpdate(dataset_id, uid, data, success, failure);
  }

  doDelete(dataset_id: any, uid:any, success: any, failure: any): void {
    $fh.sync.doDelete(dataset_id, uid, success, failure);
  }

}










