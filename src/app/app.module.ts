import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxSchedulerModule, DxTemplateModule,DxTabsModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxSchedulerModule,
        DxTemplateModule,
        DxTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
