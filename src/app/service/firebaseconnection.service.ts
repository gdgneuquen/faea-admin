import { Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Evento} from "../model/evento.model";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseconnectionService {
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];
 
  constructor(private af: AngularFireDatabase) { }

  
  getAulas(){
    return this.af.list('/aula').valueChanges();
  }

  getEstados(){
    return this.af.list('/estado').valueChanges();
  }

  getPeriodos(): string[] {
    return this.periodos;
  }

  getHorarios() {
    let arr = [], i, j;
    for (i = 7; i < 24; i++) {
      for ( j = 0; j < 4; j++) {
        //fix: usar hora con formato 99:99 para ahorrar conversiones con momentjs
        arr.push( ((i+'').length == 1 ? '0'+i : i) + ':' + (j === 0 ? '00' : 15 * j) );
      }
    }
    return arr;
  }
}
