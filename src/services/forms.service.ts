import { Injectable } from "@angular/core";
// import { Observable } from 'rxjs/Observable';
import { RequestService } from "./request.service";
// import { Response } from '@angular/http';
// import { FormsModel } from '../models/forms.model';
import 'rxjs/Rx';
// import { Http } from '@angular/http';

@Injectable()
export class FormsService {

  private forms: any;

  constructor(private cloud: RequestService) { }

  getFormsFromCloud(): void {
    var that = this;
    console.log('Retrieving forms from cloud');
    this.cloud.doGet("/forms", {})
      .subscribe(
      (data) => that.forms = data,
      (err) => console.error("ERROR getting forms", err.toString())
      );
  }

  getForms(): any {
    return this.forms;
  }
}
