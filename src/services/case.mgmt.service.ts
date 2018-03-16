import { Injectable } from "@angular/core";
import { Events } from 'ionic-angular';
import 'rxjs/Rx';
import { SyncService } from './sync.service';


// import { Recipe } from "../models/recipe";
// import { Ingredient } from "../models/ingredient";
// import { AuthService } from "./auth";

@Injectable()
export class CaseMgmtService {

  constructor(public events: Events, public syncService: SyncService) {

    events.subscribe('syncEvent.Cases', (syncEvent) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Got case event:: ', syncEvent.code);
      console.log(JSON.stringify(syncEvent));

      if (syncEvent.code === 'local_update_applied' || syncEvent.code === 'record_delta_received') {
        syncService.doList('Cases', function (data) {
          console.log('Got data from doList: ');
          console.log(JSON.stringify(data));

          // events.publish('case:list:updated', _.size(data));
          events.publish('case:list:updated', data);

        }, function (err) {
          console.log('There was an error: ' + err);
        });
      }

    });

    // setTimeout(function() {
    //     setInterval(function() {
    //       events.publish('case:list:updated', Math.floor(Math.random() * 1000) );
    //     }, 2000);
    // }, 5000);

  }

}
