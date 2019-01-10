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
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})

export class ActividadComponent implements OnInit  {

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
    private actividadService: ActividadService,
    private afService: FirebaseconnectionService,
    private router: Router,
   // private dateAdapter: DateAdapter<Date>
    ) { }

  ngOnInit() {
    this.actividadService.getActividades();
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

 /* SendActividad(actividadSend: Actividad) {
    // TODO: hacer contrl de error y validaciones
    if ( actividadSend.horaInicio === "" || actividadSend.horaFin === "" ||
        actividadSend.descripcion === "" || actividadSend.nombre === "" ||
        actividadSend.tipoActividad === "" || actividadSend.zonaAula === "") {
      alert("Por favor complete todos los campos obligatorios");
      return false;
    }
    actividadSend.pickerDesde = moment(actividadSend.pickerDesde).locale('es').format('YYYY-MM-DD');
    actividadSend.pickerHasta = moment(actividadSend.pickerHasta).locale('es').format('YYYY-MM-DD');
    // check undefined && false
    let dias = [(actividadSend.chk_lun == true),
      (actividadSend.chk_ma == true),
        (actividadSend.chk_mi == true),
          (actividadSend.chk_ju == true),
            (actividadSend.chk_vi == true),
              (actividadSend.chk_sa == true),
                (actividadSend.chk_do == true)];//creo el arreglo de días
    actividadSend.dias = dias;
  //  this.actividadService.addActividad(actividadSend);
    this.goToMain();
  }*/

  goToMain() {
    this.router.navigate(['/main']);
  }


  onClear() {
    this.actividadService.form.reset();
    this.actividadService.initializeFormGroup();
    
  }

  onSubmit() {
    if (this.actividadService.form.valid) {
      this.actividadService.insertActividad(this.actividadService.form.value);
      this.actividadService.form.reset();
      this.actividadService.initializeFormGroup();
      console.log("Submitted successfully");
     // this.notificationService.success(':: Submitted successfully');
    }
  }

}
