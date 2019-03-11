import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LiveRoutingModule } from './live-routing.module';
import { LiveListComponent } from './live-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LiveRoutingModule
  ],
  declarations: [LiveListComponent]
})
export class LiveModule { }
