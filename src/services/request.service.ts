import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/Rx';

import $fh from 'fh-js-sdk';

import { Events } from 'ionic-angular';


// import { Recipe } from "../models/recipe";
// import { Ingredient } from "../models/ingredient";
// import { AuthService } from "./auth";

@Injectable()
export class RequestService {

  private cloudUrl: string;
  private requestObserver: any;
  public request: any;

  constructor(
    private http: Http,
    events: Events
  ) {
    events.subscribe('fhinit.success', () => this.cloudUrl = $fh.getCloudURL());
    this.request = Observable.create(observer => this.requestObserver = observer);
  }

  doGet(path: string, params: Object): Observable<Response> {
    let url = this.cloudUrl + path.toString();

    console.log('Making call to URL %s', url);
    return this.http.get(url)
      .map((response: Response) => response.json());

    // return this.http.get('https://ionic2-recipebook.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
    //   .map((response: Response) => response.json());
  }

  doPut() {
    //TODO
  }

  doPost(path: string, body: Object): Observable<Response> {

    let url = this.cloudUrl + path.toString();
    let options:any = {};

    console.log('Making call to URL %s', url);

    return this.http.post(url, body, options)
      .map((response: Response) => response.json());
  }

  // addRecipe(title: string,
  //           description: string,
  //           difficulty: string,
  //           ingredients: Ingredient[]) {
  //   this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  //   console.log(this.recipes);
  // }

  // getRecipes() {
  //   return this.recipes.slice();
  // }

  // updateRecipe(index: number,
  //              title: string,
  //              description: string,
  //              difficulty: string,
  //              ingredients: Ingredient[]) {
  //   this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  // }

  // removeRecipe(index: number) {
  //   this.recipes.splice(index, 1);
  // }

  // storeList(token: string) {
  //   const userId = this.authService.getActiveUser().uid;
  //   return this.http.put('https://ionic2-recipebook.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
  //     .map((response: Response) => response.json());
  // }

  // fetchList(token: string) {
  //   const userId = this.authService.getActiveUser().uid;
  //   return this.http.get('https://ionic2-recipebook.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
  //     .map((response: Response) => {
  //       const recipes: Recipe[] = response.json() ? response.json() : [];
  //       for (let item of recipes) {
  //         if (!item.hasOwnProperty('ingredients')) {
  //           item.ingredients = [];
  //         }
  //       }
  //       return recipes;
  //     })
  //     .do((recipes: Recipe[]) => {
  //       if (recipes) {
  //         this.recipes = recipes;
  //       } else {
  //         this.recipes = [];
  //       }
  //     });
  // }
}
