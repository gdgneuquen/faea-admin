import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ActividadListComponent } from './actividad-list.component';
import { ActividadFormComponent } from './actividad-form.component';

import { ActividadRoutingModule } from './actividad-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ActividadRoutingModule
  ],
  declarations: [ActividadListComponent,ActividadFormComponent]
})
export class ActividadModule { }
