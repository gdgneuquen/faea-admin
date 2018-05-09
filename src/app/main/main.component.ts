import { AuthService } from '../providers/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  hoy = moment().locale('es').format('LLLL');
  //actividades es tipo any para poder recibir todo lo que le trae el servicio
  actividadesRef: AngularFireList<any>;
  actividades: Observable<any[]>;
  msgVal: string = ''; //mensaje de entrada del form
  selectedActividad: string = '';

  constructor(private authService: AuthService,
            public af: AngularFireDatabase,
            private router: Router){
      this.actividadesRef = af.list('actividades');
      // Use snapshotChanges().map() to store the key
      this.actividades = this.actividadesRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
    }

  ngOnInit(){
  }
  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  deleteActivity(key:string){
      //alert("la Fecha inicio y hora inicio tienen que estar llennas");
      if(confirm("Esta seguro que desea borrar el evento?")) {
        this.actividadesRef.remove( key);
        this.msgVal = '';
      }
  }

  modificarActivity(key:string){
    this.router.navigate(['/detalle', key]);
  }


}
