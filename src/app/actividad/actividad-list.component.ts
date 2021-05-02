import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActividadService } from '../model/actividad.service';
import { AulaService } from '../model/aula.service';
import { AuthService } from '../model/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actividad-list',
  templateUrl: './actividad-list.component.html',
  styleUrls: ['./actividad-list.component.css']
})
export class ActividadListComponent implements OnInit {

  displayedColumns: string[] = ['actividad','profe','dias','horario','fechainicio','fechafin','tipo' ,'aula','estado','acciones'];
  dataSource: MatTableDataSource<any>;
  searchKey: string;
  showPeriodo:boolean=false;

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
    return this.actividadService.getActividades().subscribe(

      list => {
          let array = list.map(item => {
            let aulaName = this.aulaService.getAula(item.payload.val()['zonaAula']);
            let diasCadena= this.actividadService.getDias(item.payload.val()['dias']);
            let horario = item.payload.val()['horaInicio'] + ' a ' + item.payload.val()['horaFin'];
            return {
              $key: item.key,
              aulaName,
              diasCadena,
              horario,
              ...item.payload.val()
            };
          });
          this.dataSource = new MatTableDataSource(array);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator = this.paginator;
      });
  }

  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  deleteActividad(key:string){
      if(confirm("Desea borrar la Actividad?")) {
        this.actividadService.removeActividad(key);
        this.openSnackBar("La Actividad fue borrada", "Borrar");
      }
  }

  copiarActividad(key:string){
    if(confirm("Desea copiar la Actividad?")) {
      this.actividadService.copyActividad(key);
      this.openSnackBar("La Actividad fue copiada", "Copiar");
    }
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
    this.router.navigate(['/actividad', key]);
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

}
