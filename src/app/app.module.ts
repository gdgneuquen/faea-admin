import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app-router.module';
//FORMS
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { AppComponent } from './app.component';
import { PizarraComponent } from './pizarra/pizarra.component';
import { EventoComponent } from './evento/evento.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { EventoDetalle } from './evento-detalle/evento-detalle.component';
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
    EventoComponent,
    NotificacionesComponent,
    HomeComponent,
    HeaderComponent,
    EventoDetalle,
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
  providers: [AuthService, FirebaseconnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
