  import {Component,OnInit} from '@angular/core';
  import { RouterModule, Router} from '@angular/router';
  import { ActivatedRoute, ParamMap } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import { Observable } from 'rxjs/Observable';

  import * as moment from 'moment';

  import { FirebaseconnectionService } from '../providers/firebaseconnection.service';
  import { AuthService } from '../providers/auth.service';
  import {Evento} from "../commons/evento.model";
  
  //Material
  import { MatDatepickerModule, DateAdapter } from '@angular/material';
  import { MatDatepicker } from '@angular/material';

  @Component({
    selector: 'app-evento-detalle',
    templateUrl: './evento-detalle.component.html',
    styleUrls: ['./evento-detalle.component.css']
  })

  export class EventoDetalle implements OnInit {
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    hoy = moment().locale('es').format('LLLL');
    numberHora: any[];
    // moment().locale('es').format('L');
    // moment().locale('es').format('YYYY-MM-DD'); //formato firebase
    id: any; // id recibido
    //evento: Observable<any>;
    evento: Evento;
    tiposDeActividades: Observable<any[]>;
    estadoActividades: Observable<any[]>;
    periodos: string[];
    aulas: Observable<any[]>;

    constructor(
      private authService: AuthService,
      private afService: FirebaseconnectionService,
      private router: Router,
      private route: ActivatedRoute,
      private dateAdapter: DateAdapter<Date>) { 

      this.id = this.route.snapshot.params['id'];
    /*  this.afService.getActividadByKey(this.id) 
      .snapshotChanges().subscribe(action => {
       this.evento=action.payload.val();
      });*/
          
      this.aulas = this.afService.getAulas();
      this.estadoActividades = this.afService.getEstados();
      this.tiposDeActividades = this.afService.getTiposActividades();
      this.numberHora = this.afService.getHorarios();
      this.periodos = this.afService.getPeriodos();
      this.dateAdapter.setLocale('es-ar');
      }

    ngOnInit() {
      
    }

    isUserLoggedIn() {
       return this.authService.loggedIn;
    }

    update(eventoSend: Evento) {
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
      this.cancel();
    }
    
    cancel() {
      this.router.navigate(['/main']);
    }
  }
