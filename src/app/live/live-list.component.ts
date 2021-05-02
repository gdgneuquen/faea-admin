import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActividadService } from '../model/actividad.service';
import { AulaService } from '../model/aula.service';
import { AuthService } from '../model/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  displayedColumns: string[] = ['actividad','profe','dias','horario','tipo' ,'aula', 'estado','observ','acciones'];
  dataSource: MatTableDataSource<any>;
  searchKey: string;
  showPeriodo:boolean=false;
  actividades:any[];
  unminuto = 60000;//en ms

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
      private authService: AuthService,
      public actividadService: ActividadService,
      private aulaService: AulaService,
      private router: Router,
      private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    TimerObservable
    .create(this.unminuto, this.unminuto)
    .subscribe(t => {
      this.getActividades();
    });
    this.getActividades();
  }

  getActividades() {
    return this.actividadService.getActividadesByHora().subscribe(

      list => {
          this.actividades = [];
          list.forEach(item => {

            if (this.belongsToPeriodo(item.payload.val()['pickerDesde'],item.payload.val()['pickerHasta'])
            && this.isEventValid(item.payload.val()['dias'],item.payload.val()['horaFin']) ) {
              let aulaName = this.aulaService.getAula(item.payload.val()['zonaAula']);
              let diasCadena= this.actividadService.getDias(item.payload.val()['dias']);
              let horario = item.payload.val()['horaInicio'] + ' a ' + item.payload.val()['horaFin'];
              let actividad = {
                $key: item.key,
                aulaName,
                diasCadena,
                horario,
                ...item.payload.val()
              };

              this.actividades.push(actividad);
            }
          });
  
          this.dataSource = new MatTableDataSource(this.actividades);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator = this.paginator;
      });
  }

  //que la fecha de hoy este en el periodo de la Actividad
  belongsToPeriodo(desde: any,hasta: any) {
    return moment().isBetween(moment(desde, moment.ISO_8601), moment(hasta, moment.ISO_8601).add(1,'day'));
  }

  isEventValid(dias: any,horaFin:any) {
    return (dias[moment().locale('es').weekday()]
      && moment().locale('es').format('HH:mm') <= horaFin);
  }

  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
 /* ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter("");
  }

  public editarActividad(key:string): void {
    this.router.navigate(['/actividad', key],{ queryParams: { return: 'live' }});
  }

  mostrarPeriodo() {
    if(!this.showPeriodo){
      this.showPeriodo=true;
      return this.displayedColumns=['actividad','profe','dias','horario','fechainicio','fechafin', 'periodo','tipo' ,'aula','acciones'];
    }else{
      this.showPeriodo=false;
      return this.displayedColumns=['actividad','profe','dias','horario', 'horafin','fechainicio','fechafin', 'tipo' ,'aula','acciones'];
    }   
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  setStyle(estado) {
    switch (estado) {
      case "Cambio": {
        let style = {
          'color': estado = "Cambio" ? 'orange' : 'black'
        }
        return style
      }
      case "Suspendida": {
        let style = {
          'color': estado = "Suspendida" ? 'red' : 'black'
        }
        return style
      }
      default: {
        let style = {
          'color': estado = "Normal" ? 'green' : 'black'
        }
        return style
      }
    }
  }

  setBackColor(estado) {
    switch (estado) {
      case "Grado": {
        let style = {
          'background': estado = "Grado" ? 'white' : 'black'
        }
        return style
      }
      case "Posgrado": {
        let style = {
          'background': estado = "Posgrado" ? 'bisque' : 'black'
        }
        return style
      }
      case "Extension": {
        let style = {
          'background': estado = "Extension" ? 'turquoise' : 'black'
        }
        return style
      }

      case "Investigación": {
        let style = {
          'background': estado = "Investigación" ? 'palevioletred' : 'black'
        }
        return style
      }

      case "CEFEA": {
        let style = {
          'background': estado = "CEFEA" ? 'lightskyblue' : 'black'
        }
        return style
      }

      case "Ingreso&Permanencia": {
        let style = {
          'background': estado = "Ingreso y Permanencia" ? 'cadetblue' : 'black'
        }
        return style
      }

      case "Otros": {
        let style = {
          'background': estado = "Otros" ? 'lightgray' : 'black'
        }
        return style
      }

      case "Bienestar": {
        let style = {
          'background': estado = "Bienestar" ? 'darkseagreen' : 'black'
        }
        return style
      }
      
    }
  }

}
