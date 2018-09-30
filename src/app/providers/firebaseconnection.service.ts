import { Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Evento} from "../commons/evento.model";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseconnectionService {
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];
 
  constructor(private af: AngularFireDatabase) { }

  getActividades() {
    /*return this.af.list('/actividades',ref => ref.orderByChild('horaInicio')).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });*/
  }

  getActividadesRef() {
    return this.af.list('/actividades').valueChanges();
  }
  

  getListActividadesWithOptions(options: any): AngularFireList<any[]> {
    return this.af.list('/actividades', options);
  }

  getAulas(){
    return this.af.list('/aula').valueChanges();
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

 /* getActividadByKey(key: string): AngularFireObject<any> {
    return this.af.object('/actividades/' + key);
  }*/

  addActividad(actividad: Evento) {
    // TODO: asume que fue validado
    this.af.list('/actividades').push(
      {
        descripcion: actividad.descripcion,
        dias: actividad.dias,
        estadoActividad: actividad.estadoActividad,
        horaFin: actividad.horaFin,
        horaInicio: actividad.horaInicio,
        nombre: actividad.nombre,
        periodo: actividad.periodo,
        pickerDesde: actividad.pickerDesde,
        pickerHasta: actividad.pickerHasta,
        tipoActividad: actividad.tipoActividad,
        zonaAula: actividad.zonaAula
      }
    );
  }
  updateActividadByKey(key: string, actividad: Evento) {
    // no actualizaba
   // actividad.dias = [actividad.chk_lun, actividad.chk_ma, actividad.chk_mi, actividad.chk_ju, actividad.chk_vi, actividad.chk_sa, actividad.chk_do];
    console.log(actividad);
    this.af.object('/actividades/' + key).update(actividad);
      /*{
        descripcion: actividad.descripcion,
        dias: actividad.dias,
        estadoActividad: actividad.estadoActividad,
        horaFin: actividad.horaFin,
        horaInicio: actividad.horaInicio,
        nombre: actividad.nombre,
        periodo: actividad.periodo,
        pickerDesde: actividad.pickerDesde,
        pickerHasta: actividad.pickerHasta,
        tipoActividad: actividad.tipoActividad,
        zonaAula: actividad.zonaAula
      }
    );*/

  }

  removeActividadByKey(key: string) {
    const item = this.af.object('/actividades/' + key);
    item.remove();
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
