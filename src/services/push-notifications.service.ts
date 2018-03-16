import { Injectable } from "@angular/core";
import { Events } from 'ionic-angular';
import $fh from 'fh-js-sdk';

@Injectable()
export class PushNotificationsService {

  constructor(
    public events: Events
  ) {}

  registerForPush(alias: string){
    console.log('Registering For Push with alias ', alias);

    // register with the server to start receiving push notifications
    $fh.push((e) => {

      console.log('Received notification ', e)
        // show text content of the message
        console.log(' get push notification ', JSON.stringify(e));
        // alert(e.alert);
        this.handleAlert(e);

    }, () => {
      // successfully registered
      console.log('Push Notifications Register success')

    }, (err) => {
      // handle errors
      console.log('Push Notifications Register fail', err)

    }, {
      // optional filtering criteria
      alias: alias,
      categories: ["bpm"]
    });

  }

  handleAlert(e){
      this.events.publish('pushNotification', e);
  }

}

