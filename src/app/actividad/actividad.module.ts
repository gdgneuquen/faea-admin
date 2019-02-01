import { NgModule } from '@angular/core';
import { ActividadListComponent } from './actividad-list.component';
import { ActividadFormComponent } from './actividad-form.component';

import { ActividadRoutingModule } from './actividad-routing.module';


@NgModule({
  imports: [
    ActividadRoutingModule
  ],
  declarations: [ActividadListComponent,ActividadFormComponent]
})
export class ActividadModule { }
