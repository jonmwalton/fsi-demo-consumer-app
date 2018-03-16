import { Injectable } from '@angular/core';

/*
  Generated class for the ParamsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ParamsService {

  private params: any;

  constructor() {
    console.log('Hello ParamsProvider Provider');
  }

  get() {
    return this.params || {};
  }

  set(data: any) {
    this.params = data;
  }
}
