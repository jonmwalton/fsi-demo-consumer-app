import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSearch } from './product-search';

@NgModule({
  declarations: [
    ProductSearch,
  ],
  imports: [
    IonicPageModule.forChild(ProductSearch),
  ],
  exports: [
    ProductSearch
  ]
})
export class ProductSearchModule {}
