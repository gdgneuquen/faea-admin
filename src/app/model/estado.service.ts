import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  tipoActividadList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.tipoActividadList = this.firebase.list('estado');
    this.tipoActividadList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
   }
}
