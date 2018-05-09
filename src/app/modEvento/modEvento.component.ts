  import {Component, Input, NgZone, OnDestroy, OnChanges, OnInit, DoCheck, ViewChild, SimpleChanges} from '@angular/core';
  import { RouterModule, Router} from '@angular/router';
  import { ActivatedRoute, ParamMap } from '@angular/router';
  import { FormBuilder } from '@angular/forms';

  import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

  import * as moment from 'moment';

  import { AuthService } from '../providers/auth.service';
  import { FirebaseconnectionService } from '../providers/firebaseconnection.service';
  import {Evento} from "../commons/evento.model";
  
  //Material
  import { MatDatepickerModule, DateAdapter } from '@angular/material';
  import { MatDatepicker } from '@angular/material';

  @Component({
    selector: 'modevent-app',
    templateUrl: './modEvento.component.html',
    styleUrls: ['./modEvento.component.css']
  })

  export class modEvento implements OnInit {
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    hoy = moment().locale('es').format('LLLL');
    // moment().locale('es').format('L');
    // moment().locale('es').format('YYYY-MM-DD'); //formato firebase
    // actividades es tipo any para poder recibir todo lo que le trae el servicio
    actividades: AngularFireList<any[]>;
    numberHora: any[];
    tiposDeActividades: AngularFireList<any[]>;
    estadoActividades: AngularFireList<any[]>;
    evento: AngularFireObject<any>;
    eventoObject: Evento;
    id: any; // id recibido
    periodos: string[];
    aulas: AngularFireList<any[]>;

    constructor(
      private authService: AuthService,
      private afService: FirebaseconnectionService,
      private router: Router,
      private route: ActivatedRoute,
      private dateAdapter: DateAdapter<Date>) { }

    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.afService.getActividadByKey(this.id) //{ preserveSnapshot: true }
        .snapshotChanges().subscribe(action => {
          console.log(action.type);
          console.log(action.key)
          console.log(action.payload.val())
        });
        
      this.actividades = this.afService.getListActividades();
      this.aulas = this.afService.getListAulas(50);
      this.estadoActividades = this.afService.getListEstados();
      this.tiposDeActividades = this.afService.getListTiposActividades();
      this.numberHora = this.afService.getHorario();
      this.periodos = this.afService.getListPeriodos();
      this.dateAdapter.setLocale('es-ar');
    }

    isUserLoggedIn() {
       return this.authService.loggedIn;
    }

    SendEvento(eventoSend: Evento) {
      // TODO: hacer contrl de error y validaciones
      if ( eventoSend.horaInicio === "" || eventoSend.horaFin === "" ||
          eventoSend.descripcion === "" || eventoSend.nombre === "" ||
          eventoSend.tipoActividad === "" || eventoSend.zonaAula === "") {
        alert("Por favor complete todos los campos obligatorios");
        return false;
      }
      eventoSend.pickerDesde = moment(eventoSend.pickerDesde).locale('es').format('YYYY-MM-DD');
      eventoSend.pickerHasta = moment(eventoSend.pickerHasta).locale('es').format('YYYY-MM-DD'),
      this.afService.updateActividadByKey(this.id, eventoSend);
      this.goToMain();
    }
    goToMain() {
      this.router.navigate(['/main']);
    }
  }
