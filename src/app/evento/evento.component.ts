import { Component, Input, NgZone, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../model/auth.service';
import { ActividadService } from '../model/actividad.service';
import { FirebaseconnectionService } from '../model/firebaseconnection.service';
import { Actividad } from "../model/actividad.model";

import * as moment from 'moment';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})

export class EventoComponent implements OnInit  {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  hoy = moment().locale('es').format('DD/M/YYYY');

  actividades: Observable<any[]>;
  numberHora: any[];
  tipos: Observable<any[]>;
  estadoActividades: Observable<any[]>;
  id: any; // id recibido
  periodos: string[];
  aulas: Observable<any[]>;
  msgVal: string = ''; //mensaje de entrada del form

  constructor(
    private authService: AuthService,
    private eventoService: ActividadService,
    private afService: FirebaseconnectionService,
    private router: Router,
   // private dateAdapter: DateAdapter<Date>
    ) { }

  ngOnInit() {
    this.eventoService.getEventos();
   // this.aulas = this.afService.getAulas();
   // this.estadoActividades = this.afService.getEstados();
   // this.tipos = this.afService.getTiposActividades();
    this.numberHora = this.afService.getHorarios();
    //this.periodos = this.afService.getPeriodos();
   // this.dateAdapter.setLocale('es-ar');

  }

  isUserLoggedIn() {
  // return this.authService.loggedIn;
  }

 /* SendEvento(eventoSend: Evento) {
    // TODO: hacer contrl de error y validaciones
    if ( eventoSend.horaInicio === "" || eventoSend.horaFin === "" ||
        eventoSend.descripcion === "" || eventoSend.nombre === "" ||
        eventoSend.tipoActividad === "" || eventoSend.zonaAula === "") {
      alert("Por favor complete todos los campos obligatorios");
      return false;
    }
    eventoSend.pickerDesde = moment(eventoSend.pickerDesde).locale('es').format('YYYY-MM-DD');
    eventoSend.pickerHasta = moment(eventoSend.pickerHasta).locale('es').format('YYYY-MM-DD');
    // check undefined && false
    let dias = [(eventoSend.chk_lun == true),
      (eventoSend.chk_ma == true),
        (eventoSend.chk_mi == true),
          (eventoSend.chk_ju == true),
            (eventoSend.chk_vi == true),
              (eventoSend.chk_sa == true),
                (eventoSend.chk_do == true)];//creo el arreglo de días
    eventoSend.dias = dias;
  //  this.eventoService.addActividad(eventoSend);
    this.goToMain();
  }*/

  goToMain() {
    this.router.navigate(['/main']);
  }


  onClear() {
    this.eventoService.form.reset();
    this.eventoService.initializeFormGroup();
    
  }

  onSubmit() {
    if (this.eventoService.form.valid) {
      this.eventoService.insertEvento(this.eventoService.form.value);
      this.eventoService.form.reset();
      this.eventoService.initializeFormGroup();
      console.log("Submitted successfully");
     // this.notificationService.success(':: Submitted successfully');
    }
  }

}
