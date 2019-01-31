import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActividadService } from '../model/actividad.service';
import { AulaService } from '../model/aula.service';
import { AuthService } from '../model/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msgVal: string = ''; //mensaje de entrada del form
  displayedColumns: string[] = ['actividad','profe','dias','horario','fechainicio','fechafin','tipo' ,'aula','acciones'];
  dataSource: MatTableDataSource<any>;
  searchKey: string;
  showPeriodo:boolean=false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private authService: AuthService,
      public actividadService: ActividadService,
      private aulaService: AulaService,
      private router: Router
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

  public editarActividad(id:number): void {
    this.router.navigate(['/actividad', id]);
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

}
