import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActividadComponent } from './actividad/actividad.component';
import { PizarraComponent } from './pizarra/pizarra.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './notfound/page.not.found.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

export const routes: Routes = [
    { path: 'home',  component: HomeComponent  },
    { path: 'actividad',  component: ActividadComponent  },
    { path: 'pizarra', component: PizarraComponent },
    { path: 'notificaciones', component: NotificacionesComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
