import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FirebaseconnectionService } from '../providers/firebaseconnection.service';
import { AuthService } from '../providers/auth.service';
import * as moment from 'moment';

export interface Evento {
  key?: string;
  descripcion?: string;
  dias?: any[];
  horaFin?: string;
  horaInicio?: string;
  nombre?: string;
  pickerDesde?: string;
  pickerHasta?: string;
  estadoActividad?: string;
  tipoActividad?: string;
  zonaAula?: string;
  periodo?: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  hoy = moment().locale('es').format('LLLL');
  actividades: Observable<Evento[]>;
  msgVal: string = ''; //mensaje de entrada del form
  selectedActividad: string = '';
  displayedColumns: string[] = ['periodo', 'horainicio', 'horafin','actividad', 'tipo', 'profe','aula'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
      private authService: AuthService,
      public af: FirebaseconnectionService
  ){}

  ngOnInit(){
    return this.af.getActividadesRef().subscribe(res => this.dataSource.data = res);
  }

  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  deleteActivity(key:string){
      //alert("la Fecha inicio y hora inicio tienen que estar llennas");
      if(confirm("Esta seguro que desea borrar el evento?")) {
       // this.actividadesRef.remove( key);
        this.msgVal = '';
      }
  }

  modificarActivity(key:string){
   // this.router.navigate(['/detalle', key]);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
