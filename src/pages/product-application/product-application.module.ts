import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductApplication } from './product-application';

@NgModule({
  declarations: [
    ProductApplication,
  ],
  imports: [
    IonicPageModule.forChild(ProductApplication),
  ],
  exports: [
    ProductApplication
  ]
})
export class ProductApplicationModule {}
