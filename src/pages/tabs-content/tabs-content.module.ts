import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsContentPage } from './tabs-content';

@NgModule({
  declarations: [
    TabsContentPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsContentPage),
  ],
  exports: [
    TabsContentPage
  ]
})
export class TabsContentPageModule {}
