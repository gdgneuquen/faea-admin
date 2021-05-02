import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe,registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';

//temp
import { AuthenticationComponent } from './authentication/authentication.component';
import { PizarraComponent } from './pizarra/pizarra.component';


// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { LayoutComponent } from './layout/layout.component';
import { P404Component } from './page/404.component';

// Model & Servicios
import { FirebaseconnectionService } from './model/firebaseconnection.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './model/auth.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';


//Shared
import { MaterialModule } from './shared/material.module';
import { environment } from '../environments/environment';

//Locale Spanish-Argentina
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
      AppComponent,
      LayoutComponent,
      P404Component,
      AuthenticationComponent,
      PizarraComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    FirebaseconnectionService,
    DatePipe, 
    { provide: LOCALE_ID, useValue: "es-AR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
