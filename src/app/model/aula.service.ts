import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as _ from 'lodash';

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

   getAula($key) {
    if ($key == "0")
      return "";
    else{
        if(_.find(this.array, (obj) => { return obj.$key == $key; })==undefined){
          return "";
        }else{
          return _.find(this.array, (obj) => { return obj.$key == $key; })['nombre'];
        }
      }
    }
}
