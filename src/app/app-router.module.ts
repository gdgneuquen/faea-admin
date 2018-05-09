import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import {AdminComponent} from './admin/admin.component';
import {MainComponent} from './main/main.component';
import {EventoDetalle} from './evento-detalle/evento-detalle.component';
import {PageNotFoundComponent} from './notfound/page.not.found.component';
import {NotificacionesComponent} from './notificaciones/notificaciones.component';

export const routes: Routes = [
    { path: 'main',  component: MainComponent  },
    { path: 'admin',  component: AdminComponent  },
    { path: 'event', component: EventoComponent },
    { path: 'detalle/:id', component: EventoDetalle },
    { path: 'notificaciones',   component: NotificacionesComponent},
    { path: '', redirectTo: '/main', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
