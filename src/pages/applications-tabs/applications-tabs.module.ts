import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationsTabsPage } from './applications-tabs';

@NgModule({
  declarations: [
    ApplicationsTabsPage
  ],
  imports: [
    IonicPageModule.forChild(ApplicationsTabsPage),
  ]
})
export class ApplicationsTabsPageModule {}
