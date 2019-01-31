import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app-router.module';
import { DatePipe,registerLocaleData } from '@angular/common';
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

//Locale Spanish-Argentina
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr);

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
  providers: [AuthService, FirebaseconnectionService,DatePipe, { provide: LOCALE_ID, useValue: "es-AR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
