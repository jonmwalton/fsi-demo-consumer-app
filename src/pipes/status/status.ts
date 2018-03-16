import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

/**
 * Generated class for the StatusPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'status',
  pure: true
})

export class StatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(data: any, status: string) {
    if (!data || !status) {
      return [];
    } else {
      let filter = _.filter(data, (item: any) => {
        let appStatus = item.status.toLowerCase();
        return _.includes(appStatus, status);
      });

      return filter;
    }
  }
}
