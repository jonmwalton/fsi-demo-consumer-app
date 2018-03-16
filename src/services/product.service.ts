import { Injectable } from "@angular/core";
import { RequestService } from "./request.service";

import { Product } from "../models/product.model";
import { PRODUCTS } from "../models/mock/mock-data";

@Injectable()
export class ProductService {

  private products: any;

  constructor(
    private cloud: RequestService
  ) {
    this.products = PRODUCTS;
  }

  getProductsFromCloud(): void {
    // return this.products;
    this.cloud.doGet("/products", {})
      .subscribe(
      (data) => this.products = data,
      (err) => console.error("ERROR", err.toString())
      )
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductDetails(id: number): Promise<any> {
    let self = this;

    return new Promise((resolve, reject) => {
      self.products.forEach((item) => {
        if (item.id === id) {
          return resolve(item);
        }
      });
    });
  }
}

