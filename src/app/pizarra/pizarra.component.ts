 
import { Component, OnInit} from '@angular/core';

import { Subscription} from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';

import * as moment from 'moment';
import { FirebaseconnectionService } from "../model/firebaseconnection.service";
import { Actividad } from "../model/actividad.model";


@Component({
  selector: 'app-pizarra',
  templateUrl: './pizarra.component.html',
  styleUrls: ['./pizarra.component.css']
})
export class PizarraComponent implements OnInit {

  private subscription : Subscription;

  //Relacionado al plugin momentjs:
  horaActual = moment().locale('es').format('LT');
  hoy = moment().locale('es').format('LLLL');//fecha
  dia = moment().locale('es').format('dddd');//dia de la semana
  diezminutos=600000;//en ms
  //Relacionado al plugin ngx-order-pipe. Hay que agregarlo a imports en app.module.ts
  order = "actividad.pickerDesde";
  reverse = true;

  actividades : any = new Array;

  //actividades es tipo any para poder recibir todo lo que le trae el servicio

  constructor(
    private authService: AuthService,
    private afService: FirebaseconnectionService,
    private router: Router) {}

  ngOnInit() {
    let timer = TimerObservable.create(this.diezminutos, this.diezminutos);
    this.subscription=timer.subscribe(t=>{
      this.getActividades();  
    })
    this.getActividades();
  }

  isUserLoggedIn() {
     return this.authService.loggedIn;
   }

  getActividades() {
  /*  this.afService.getActividades().subscribe(actividades => {
        this.actividades = [], // reset por la subscripcion
        actividades.forEach(actividad => this.filterCurrentActivity(actividad))
    })*/
  }
  
  // filtrar actividad de esta semana y de hoy
  // controlar que sea valido, que este dentro de la semana vigente, que sea dia actual
  // que no vencio (en horas) y que este en el array de dias seleccionados
  filterCurrentActivity(actividad: Actividad) {
    // evento que esta en la semana actual, y que sea hoy
    if ( this.belongsToPeriodo(actividad) //&& this.belongsToToday(actividad)
        &&  this.isEventValid(actividad)) {

          var actividad2 = {
            horario: actividad.horaInicio + ' a ' + actividad.horaFin,
            actividad: actividad.descripcion,
            tipo: actividad.tipoActividad,
            profesor: actividad.nombre,
            aula: actividad.zonaAula,
            estado: actividad.estadoActividad,
          }
         // console.log(actividad2);
        this.actividades.push(actividad2);
    }
  }
  //que la fecha de hoy este entre la fecha y hora disponible del la actividad
  belongsToPeriodo(actividad: Actividad) {
    return moment().isBetween(moment(actividad.pickerDesde, moment.ISO_8601), moment(actividad.pickerHasta, moment.ISO_8601));
  }

  belongsToToday(actividad: Actividad) {
    const currentFromDayFrom = moment(actividad.pickerDesde).locale('es');
    const currentFromDayTo = moment(actividad.pickerHasta).locale('es');
    return moment().locale('es').diff(currentFromDayFrom, 'days') === 0 || moment().locale('es').diff(currentFromDayTo, 'days') === 0;
  }

  // Controlar el dia seleccionado en array y la hora vencida
  isEventValid(actividad: Actividad) {
    return (actividad.dias[moment().locale('es').weekday()]
    && moment().locale('es').format('HH:mm') <= actividad.horaFin);
  }

  // esta funcion estaba pensada paracambiar el fondo por uno mas llamativo de la actividad en curso.
  estaEnCurso(actividad: Actividad) {
    // TODO: implementar funcion.
  }

}
 
