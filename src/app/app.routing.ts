import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LayoutComponent} from './layout/layout.component';
import {P404Component} from './page/404.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
      //  canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: 'app/home/home.module#HomeModule'
            },
            {
                path: 'actividad',
                loadChildren: 'app/actividad/actividad.module#ActividadModule'
            }
        ]
    },
    // otherwise redirect to home
    {path: '**', component: P404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
