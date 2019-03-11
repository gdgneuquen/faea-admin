import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveListComponent } from './live-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Actividades'
    },
    children: [
      {
        path: 'list',
        component: LiveListComponent,
        data: {
          title: 'Listado',
        }
      },
   /*   {
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
      },*/
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
export class LiveRoutingModule { }
