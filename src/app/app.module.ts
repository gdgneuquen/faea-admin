import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app-router.module';
//FORMS
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { AppComponent } from './app.component';
import { EventoComponent } from './evento/evento.component';
import { AdminComponent } from './admin/admin.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { EventoDetalle } from './evento-detalle/evento-detalle.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthService } from './providers/auth.service';
import { FirebaseconnectionService } from './providers/firebaseconnection.service';
import { PageNotFoundComponent} from './notfound/page.not.found.component';
import { OrderModule } from 'ngx-order-pipe';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';


//Material
import { MatDatepickerModule, MatNativeDateModule , MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,MatMenuModule,MatToolbarModule,MatIconModule} from '@angular/material';
import {MatInputModule, MatSelectModule,MatTableModule,MatSortModule,MatPaginatorModule,MatCardModule} from '@angular/material';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    EventoComponent,
    AdminComponent,
    NotificacionesComponent,
    MainComponent,//Pag. inicial admin, puede modificar items en pantalla
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
    BrowserAnimationsModule, MatDatepickerModule,
    MatButtonModule, MatNativeDateModule, MatInputModule, MatCheckboxModule,
    MatSelectModule,MatTableModule,MatSortModule,MatPaginatorModule,MatCardModule,
    MatMenuModule,MatToolbarModule,MatIconModule
  ],
  providers: [AuthService, FirebaseconnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
