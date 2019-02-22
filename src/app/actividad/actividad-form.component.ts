import { Component, Input, NgZone, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { ActividadService } from '../model/actividad.service';
import { AulaService } from '../model/aula.service';
import { EstadoService } from '../model/estado.service';
import { TipoActividadService } from '../model/tipo-actividad.service';

import * as moment from 'moment';
import { Actividad } from '../model/actividad.model';

export interface Aula {
  nombre: string;
}

@Component({
  selector: 'app-actividad-form',
  templateUrl: './actividad-form.component.html',
  styleUrls: ['./actividad-form.component.css']
})

export class ActividadFormComponent implements OnInit  {

  id: string; 
  parameters: any;
  mode: string = '';
  errorMessage: string;
  actividad: any;
  submitted: boolean = false;
  periodos: string[];
  msgVal: string = ''; //mensaje de entrada del form
  numberHora: any[];
  actividadForm: FormGroup;
  filteredAulas: Observable<Aula[]>;


  constructor(
    //private authService: AuthService,
    public actividadService: ActividadService,
    public aulaService: AulaService,
    public tipoActividadService: TipoActividadService,
    public estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.actividadForm=this.actividadService.form;
    this.numberHora = this.actividadService.getHorarios(); 
    this.filteredAulas = this.actividadForm.get('aula').valueChanges
    /*  .pipe(
        startWith<string | Aula>(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(name => name ? this._filter(name) : this.aulaService.array.slice())
      );*/
    this.getActividad();
  }

  getActividad(){
    // _route is activated route service. this.route.params is observable.
    // subscribe is method that takes function to retrieve parameters when it is changed.
    this.parameters = this.activatedRoute.params.subscribe(params => {
   // plus(+) is to convert 'id' to number
   if (typeof params['id'] !== 'undefined') {
     this.id = params['id'];
     this.errorMessage = '';
     this.actividadService.getActividadById(this.id)
         .subscribe(
             actividad => {
               typeof actividad.payload.val().motivo == 'undefined' ? this.actividad={motivo:'',...actividad.payload.val()} : this.actividad=actividad.payload.val();
      
               this.actividad = this.actividadService.translateActividad({$key:actividad.key,...this.actividad});
               this.actividadService.form.setValue(this.actividad);
               this.mode = 'update';
             },
             error => {
               // unauthorized access
               if (error.status == 401 || error.status == 403) {
                // this.staffService.unauthorizedAccess(error);
               } else {
                 this.errorMessage = error.data.message;
               }
             }
         );
   } else {
     this.mode = 'create';
     this.onClear();
   }
 });
}


 /* displayFn(user?: Aula): string | undefined {
    return user ? user.nombre : undefined;
  }

  private _filter(name: string): Aula[] {
    const filterValue = name.toLowerCase();

    return this.aulaService.array.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }
*/
  isUserLoggedIn() {
  // return this.authService.loggedIn;
  }

  onCancel() {
    this.router.navigate(['/actividad']);
  }


  onClear() {
    this.actividadService.form.reset();
    this.actividadService.initializeFormGroup();
    
  }

  onSubmit() {
    if (this.actividadService.form.valid) {
     if (this.mode==='update'){
      this.actividadService.updateActividad(this.actividadService.form.value);
      this.router.navigate(['/actividad']);

      }else{
     // this.actividad=this.actividadService.form.value;
      // delete this.actividad.key;
      this.actividadService.insertActividad(this.actividadService.form.value);
      this.router.navigate(['/actividad']);
    }
  }
  }
}
