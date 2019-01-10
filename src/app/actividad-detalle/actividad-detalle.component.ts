  import {Component,OnInit} from '@angular/core';
  import { RouterModule, Router} from '@angular/router';
  import { ActivatedRoute, ParamMap } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import { Observable } from 'rxjs/Observable';

  import * as moment from 'moment';

  import { FirebaseconnectionService } from '../model/firebaseconnection.service';
  import { ActividadService } from '../model/actividad.service';
  import { AuthService } from '../model/auth.service';
  import { Actividad } from "../model/actividad.model";
  
  //Material
  import { MatDatepickerModule, DateAdapter } from '@angular/material';
  import { MatDatepicker } from '@angular/material';

  @Component({
    selector: 'app-actividad-detalle',
    templateUrl: './actividad-detalle.component.html',
    styleUrls: ['./actividad-detalle.component.css']
  })

  export class ActividadDetalle implements OnInit {
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    hoy = moment().locale('es').format('LLLL');
    numberHora: any[];
    // moment().locale('es').format('L');
    // moment().locale('es').format('YYYY-MM-DD'); //formato firebase
    id: any; // id recibido
    //actividad: Observable<any>;
    actividad: Actividad;
    tiposDeActividades: Observable<any[]>;
    estadoActividades: Observable<any[]>;
    periodos: string[];
    aulas: Observable<any[]>;

    constructor(
      private authService: AuthService,
      private afService: FirebaseconnectionService,
      private actividadService: ActividadService,
      private router: Router,
      private route: ActivatedRoute,
      private dateAdapter: DateAdapter<Date>) { 

      this.id = this.route.snapshot.params['id'];
    /*  this.afService.getActividadByKey(this.id) 
      .snapshotChanges().subscribe(action => {
       this.actividad=action.payload.val();
      });*/
          
      //this.aulas = this.afService.getAulas();
      this.estadoActividades = this.afService.getEstados();
      //this.tiposDeActividades = this.afService.getTiposActividades();
      this.numberHora = this.afService.getHorarios();
      this.periodos = this.afService.getPeriodos();
      this.dateAdapter.setLocale('es-ar');
      }

    ngOnInit() {
      
    }

    isUserLoggedIn() {
       return this.authService.loggedIn;
    }

    update(actividadSend: Actividad) {
      // TODO: hacer contrl de error y validaciones
      if ( actividadSend.horaInicio === "" || actividadSend.horaFin === "" ||
          actividadSend.descripcion === "" || actividadSend.nombre === "" ||
          actividadSend.tipoActividad === "" || actividadSend.zonaAula === "") {
        alert("Por favor complete todos los campos obligatorios");
        return false;
      }
      actividadSend.pickerDesde = moment(actividadSend.pickerDesde).locale('es').format('YYYY-MM-DD');
      actividadSend.pickerHasta = moment(actividadSend.pickerHasta).locale('es').format('YYYY-MM-DD'),
      this.actividadService.updateActividadByKey(this.id, actividadSend);
      this.cancel();
    }
    
    cancel() {
      this.router.navigate(['/main']);
    }
  }
