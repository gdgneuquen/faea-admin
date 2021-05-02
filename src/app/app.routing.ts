import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LayoutComponent} from './layout/layout.component';
import {P404Component} from './page/404.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'actividad',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
      //  canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'actividad',
                loadChildren: () => import('app/actividad/actividad.module').then(m => m.ActividadModule)
            },
            {
                path: 'live',
                loadChildren: () => import('app/live/live.module').then(m => m.LiveModule)
            }
        ]
    },
    // otherwise redirect to home
    {path: '**', component: P404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
