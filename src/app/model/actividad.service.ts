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
    motivo: new FormControl(''),
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
      motivo: '',
      tipo: '',
      dias:{
        lu: false,
      ma: false,
      mi: false,
      ju: false,
      vi: false,
      sa: false,
      do: false
      }
    });
  }

  getActividades() {
    this.actividadesList = this.af.list('actividades');
    return this.actividadesList.snapshotChanges();
  }

  getActividadById(id:string): Observable<any> {
    return this.af.object('/actividades/' + id).snapshotChanges();
  }

  translateActividad(actividad:any){
    return{
      $key: actividad.$key,
      nombre: actividad.descripcion,
      dias: {
        lu: actividad.dias[0] == undefined ? false : actividad.dias[0],
        ma: actividad.dias[1] == undefined ? false : actividad.dias[1],
        mi: actividad.dias[2] == undefined ? false : actividad.dias[2],
        ju: actividad.dias[3] == undefined ? false : actividad.dias[3],
        vi: actividad.dias[4] == undefined ? false : actividad.dias[4],
        sa: actividad.dias[5] == undefined ? false : actividad.dias[5],
        do: actividad.dias[6] == undefined ? false : actividad.dias[6],
      },
      estado: actividad.estadoActividad,
      motivo: actividad.motivo == 'undefined' ? "" : actividad.motivo,
      horaFin: actividad.horaFin,
      horaInicio: actividad.horaInicio,
      referente: actividad.nombre,
    //  periodo: actividad.periodo,
      fechaDesde: actividad.pickerDesde == "" ? "" : this.datePipe.transform(actividad.pickerDesde, 'yyyy-MM-dd'),
      fechaHasta: actividad.pickerHasta  == "" ? "" : this.datePipe.transform(actividad.pickerHasta, 'yyyy-MM-dd'),
      tipo: actividad.tipoActividad,
      aula: actividad.zonaAula,
    }
  }

  insertActividad(actividad) {
    this.af.list('/actividades').push(
      {
        descripcion: actividad.nombre,
        dias: {
          0: actividad.dias.lu,
          1: actividad.dias.ma,
          2: actividad.dias.mi,
          3: actividad.dias.ju,
          4: actividad.dias.vi,
          5: actividad.dias.sa,
          6: actividad.dias.do,
        },
        estadoActividad: actividad.estado,
        motivo: actividad.motivo,
        horaFin: actividad.horaFin,
        horaInicio: actividad.horaInicio,
        nombre: actividad.referente,
        periodo: "1er Cuatrimestre",
        pickerDesde: actividad.fechaDesde == "" ? "" : this.datePipe.transform(actividad.fechaDesde, 'yyyy-MM-dd'),
        pickerHasta: actividad.fechaHasta == "" ? "" : this.datePipe.transform(actividad.fechaHasta, 'yyyy-MM-dd'),
        tipoActividad: actividad.tipo,
        zonaAula: actividad.aula,
      }
    );
  }

  updateActividad(actividad: any){
    this.af.list('actividades').update(actividad.$key,
      {
        descripcion: actividad.nombre,
        dias: {
          0: actividad.dias.lu,
          1: actividad.dias.ma,
          2: actividad.dias.mi,
          3: actividad.dias.ju,
          4: actividad.dias.vi,
          5: actividad.dias.sa,
          6: actividad.dias.do,
        },
        estadoActividad: actividad.estado,
        motivo: actividad.motivo,
        horaFin: actividad.horaFin,
        horaInicio: actividad.horaInicio,
        nombre: actividad.referente,
        periodo: "1er Cuatrimestre",
        pickerDesde: actividad.fechaDesde == "" ? "" : this.datePipe.transform(actividad.fechaDesde, 'yyyy-MM-dd'),
        pickerHasta: actividad.fechaHasta == "" ? "" : this.datePipe.transform(actividad.fechaHasta, 'yyyy-MM-dd'),
        tipoActividad: actividad.tipo,
        zonaAula: actividad.aula,
      });
  }

    removeActividad(key:string) {
      this.af.list('actividades').remove(key);
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
      if(dato[dias.Do]) response=response+" Do,";
      return response.substr(0,response.length-1);      
    }
}
