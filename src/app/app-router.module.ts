import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { PizarraComponent } from './pizarra/pizarra.component';
import { HomeComponent } from './home/home.component';
import { EventoDetalle } from './evento-detalle/evento-detalle.component';
import { PageNotFoundComponent } from './notfound/page.not.found.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

export const routes: Routes = [
    { path: 'home',  component: HomeComponent  },
    { path: 'evento',  component: EventoComponent  },
    { path: 'pizarra', component: PizarraComponent },
    { path: 'evento/:id', component: EventoDetalle },
    { path: 'notificaciones', component: NotificacionesComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
