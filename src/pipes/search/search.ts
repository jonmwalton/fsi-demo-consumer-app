import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../../models/product.model';
import _ from 'lodash';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(lists: any, term: string) {
    // console.log('SearchPipe: ', list);
    if (_.isNull(lists)) {
      // console.log('SearchPipe: ', list);
      return [];
    }

    if (_.isUndefined(term) || _.isNull(term)) {
      return lists;
    } else {
      let searchTerm = {
        name: term.toLowerCase()
      };

      let searchFilter = _.filter(lists, (list: any) => {

        // if (list.loan) {
        // let found = _.filter(list.loan, (item: Product) => {
        let product: string = list.name.toLowerCase();
        return _.includes(product, searchTerm.name);
        // });

        // return found;
        // }

        // if (list.credit) {
        //   let found = _.filter(list.credit, (item: Product) => {
        //     let product: string = item.name.toLowerCase();
        //     return _.includes(product, searchTerm.name);
        //   });

        //   return found;
        // }

        // if (list.card) {
        //   let found = _.filter(list.card, (item: Product) => {
        //     let product: string = item.name.toLowerCase();
        //     return _.includes(product, searchTerm.name);
        //   });

        //   return found;
        // }
      });
      // debugger;
      return searchFilter;
    }
  }
}
