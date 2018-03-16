import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageReviewPage } from './image-review';

@NgModule({
  declarations: [
    ImageReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageReviewPage),
  ],
  exports: [
    ImageReviewPage
  ]
})
export class ImageReviewPageModule {}
