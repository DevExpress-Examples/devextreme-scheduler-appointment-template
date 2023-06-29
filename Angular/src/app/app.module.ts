import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxSchedulerModule, DxTemplateModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { TooltipModule } from './tooltip/tooltip.module';
import { ApplyPipe } from './pipes';

@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,
    DxTemplateModule,
    TooltipModule,
  ],
  declarations: [AppComponent, ApplyPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
