import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadListComponent } from './actividad-list.component';
import { ActividadFormComponent } from './actividad-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Actividades'
    },
    children: [
      {
        path: 'list',
        component: ActividadListComponent,
        data: {
          title: 'Listado',
        }
      },
      {
        path: 'create',
        component: ActividadFormComponent,
        data: {
          title: 'Crear'
        }
      },
      {
        path: ':id',
        component: ActividadFormComponent,
        data: {
          title: 'Actualizar'
        }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadRoutingModule { }
