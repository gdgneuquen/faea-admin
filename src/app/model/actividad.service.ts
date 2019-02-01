import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Actividad } from "../model/actividad.model";
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';

enum dias {
  Lu = 0,
  Ma,
  Mi,
  Ju,
  Vi,
  Sa,
  Do
}

@Injectable({
  providedIn: 'root'
})

export class ActividadService {

  constructor(private af: AngularFireDatabase,private datePipe: DatePipe) { }

  actividadesList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    referente: new FormControl('', Validators.required), // nombre prof/ref
    aula: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    horaInicio: new FormControl('', Validators.required),
    horaFin: new FormControl('', Validators.required),
    fechaDesde: new FormControl('', Validators.required),
    fechaHasta: new FormControl('', Validators.required),
    estado: new FormControl(''),
    dias: new FormGroup({
      lu: new FormControl(false),
      ma: new FormControl(false),
      mi: new FormControl(false),
      ju: new FormControl(false),
      vi: new FormControl(false),
      sa: new FormControl(false),
      do: new FormControl(false)
    })
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nombre: '',
      referente: '',
      horaInicio: '',
      horaFin: '',
      fechaDesde: '',
      fechaHasta: '',
      aula: '',
      estado: '',
      tipo: '',
    });
  }

  getActividades() {
    this.actividadesList = this.af.list('actividades');
    return this.actividadesList.snapshotChanges();
  }

  getActividadById(id:string): Observable<any> {
    return this.af.object('/actividades/' + id).snapshotChanges();
  }

  updateActividadById(actividad: Actividad): Observable<any> {
    return Observable.fromPromise(
      this.af.object('/actividades/' + actividad.key).update(actividad)
    );
  }

  addActividad(actividad: Actividad): Observable<any> {
    return Observable.fromPromise(
      this.af.object('/actividades/' + actividad.key).set(actividad)
    );
  }

  insertActividad(actividad) {
    // TODO: asume que fue validado
    this.af.list('/actividades').push(
      {
        descripcion: actividad.nombre,
        dias: actividad.dias,
        estadoActividad: actividad.estado,
        horaFin: actividad.horaFin,
        horaInicio: actividad.horaInicio,
        nombre: actividad.referente,
        periodo: "1er Cuatrimestre",
        pickerDesde: actividad.fechaDesde == "" ? "" : this.datePipe.transform(actividad.fechaDesde, 'yyyy-MM-dd'),
        pickerHasta: actividad.fechaHasta == "" ? "" : this.datePipe.transform(actividad.fechaHasta, 'yyyy-MM-dd'),
        tipoActividad: actividad.tipo,
        zonaAula: actividad.aula.$key,
      }
    );
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

    getDias(dato:Array<boolean>):string{
      let response:string="";
      if(dato[dias.Lu]) response=response+"Lu,";
      if(dato[dias.Ma]) response=response+" Ma,";
      if(dato[dias.Mi]) response=response+" Mi,";
      if(dato[dias.Ju]) response=response+" Ju,";
      if(dato[dias.Vi]) response=response+" Vi,";
      if(dato[dias.Sa]) response=response+" Sa,";
      if(dato[dias.Sa]) response=response+" Do,";
      return response.substr(0,response.length-1);      
    }
}
