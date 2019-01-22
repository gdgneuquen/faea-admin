import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  aulaList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.aulaList = this.firebase.list('aula');
    this.aulaList.snapshotChanges().subscribe(
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
