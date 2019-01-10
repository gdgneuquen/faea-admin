import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Actividad } from "../model/actividad.model";

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private af: AngularFireDatabase) { }

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
    dias: new FormControl(''),
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

 /* getActividadByKey(key: string): AngularFireObject<any> {
    return this.af.object('/actividades/' + key);
  }*/

  
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
        periodo: actividad.periodo,
        pickerDesde: actividad.fechaDesde,
        pickerHasta: actividad.fechaHasta,
        tipoActividad: actividad.tipo,
        zonaAula: actividad.aula,
      }
    );
  }

  updateActividadByKey(key: string, actividad: Actividad) {
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
}
