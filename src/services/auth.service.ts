import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoginModel } from './../models/login.model';
import { RequestService } from "./request.service";


/*
  Generated class for the Auth Service.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthService {
  private _validUserLabel: string = 'VALID_USER';
  username: string;
  device: string;
  // private api: any;

  constructor(
    private storage: Storage,
    private cloud: RequestService
  ) {
    // this.api = requestService;
  }

  // private _validateCredentials(model: LoginModel): boolean {
  //   return (model && model.username &&
  //     model.username.length > 0 && model.password
  //     && model.password.length > 0);
  // }

  // public doAuth(cred: LoginModel): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     if (this._validateCredentials(cred)) {
  //       this.storage.set(this._validUserLabel, true);
  //       resolve(true);
  //     } else {
  //       console.error('Problme with user credentials.');
  //       reject(false)
  //     }
  //   })
  // }

  public doAuth(cred: LoginModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.cloud.doPost('/auth/login', cred)
      .subscribe((data) => {
        this.username = cred.username;
        resolve(true);
      }, (err) => {
        console.error('Auth: ', err.toString());
        reject(false);
      })
    })
  }

  public hasSession(): Promise<boolean> {
    return this.storage.get(this._validUserLabel);
  }

  public doLogout(username: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.set(this._validUserLabel, false);
      resolve(true);
    });
  }

  public getUserName(): string {
    return this.username;
  }

  public getDevice(): string {
    return this.device;
  }

  public setDevice(device) {
    this.device = device;
  }
}
