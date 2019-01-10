import { Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Actividad } from "../model/actividad.model";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseconnectionService {
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];

  aulaList: AngularFireList<any>;

  tipoList: AngularFireList<any>;

  aulasArray = [];

  tiposArray = [];
 
  constructor(private af: AngularFireDatabase) {

    this.aulaList = this.af.list('aula');
    this.tipoList = this.af.list('tipo');

    this.aulaList.snapshotChanges().subscribe(
      list => {
        this.aulasArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

      this.tipoList.snapshotChanges().subscribe(
        list => {
          this.tiposArray = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });
   }

  getEstados(){
    return this.af.list('/estado').valueChanges();
  }

  getPeriodos(): string[] {
    return this.periodos;
  }

  getTiposActividades() {
    return this.af.list('/tipo').valueChanges();
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
