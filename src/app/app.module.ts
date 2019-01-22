import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app-router.module';
import { DatePipe } from '@angular/common';
//FORMS
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { AppComponent } from './app.component';
import { PizarraComponent } from './pizarra/pizarra.component';
import { ActividadComponent } from './actividad/actividad.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ActividadDetalle } from './actividad-detalle/actividad-detalle.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PageNotFoundComponent} from './notfound/page.not.found.component';
import { OrderModule } from 'ngx-order-pipe';

//Servicios
import { AuthService } from './model/auth.service';
import { FirebaseconnectionService } from './model/firebaseconnection.service';

//Shared
import { MaterialModule } from './shared/material.module';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Material
import { MatDatepickerModule, MatNativeDateModule , MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,MatMenuModule,MatToolbarModule,MatIconModule,MatGridListModule,} from '@angular/material';
import {MatInputModule, MatSelectModule,MatTableModule,MatSortModule,MatPaginatorModule,MatCardModule} from '@angular/material';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PizarraComponent,
    ActividadComponent,
    NotificacionesComponent,
    HomeComponent,
    HeaderComponent,
    ActividadDetalle,
    PageNotFoundComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthService, FirebaseconnectionService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
