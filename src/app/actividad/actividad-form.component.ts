import { Component, Input, NgZone, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { ActividadService } from '../model/actividad.service';
import { AulaService } from '../model/aula.service';
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
  actividad: Actividad;
  submitted: boolean = false;
  periodos: string[];
  msgVal: string = ''; //mensaje de entrada del form
  numberHora: any[];
  actividadForm: FormGroup;
  filteredAulas: Observable<Aula[]>;


  constructor(
    //private authService: AuthService,
    private actividadService: ActividadService,
    private aulaService: AulaService,
    private tipoActividadService: TipoActividadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.actividadForm=this.actividadService.form;
    this.numberHora = this.actividadService.getHorarios(); 
    this.filteredAulas = this.actividadForm.get('zonaAula').valueChanges
      .pipe(
        startWith<string | Aula>(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(name => name ? this._filter(name) : this.aulaService.array.slice())
      );
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
               
               this.actividad = {$key:actividad.key,...actividad.payload.val()};
               console.log(this.actividad);
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
     console.log(params['key']);
     this.mode = 'create';
     this.onClear();
   }
 });
}



  displayFn(user?: Aula): string | undefined {
    return user ? user.nombre : undefined;
  }

  private _filter(name: string): Aula[] {
    const filterValue = name.toLowerCase();

    return this.aulaService.array.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  isUserLoggedIn() {
  // return this.authService.loggedIn;
  }

  goToMain() {
    this.router.navigate(['/main']);
  }


  onClear() {
    this.actividadService.form.reset();
    this.actividadService.initializeFormGroup();
    
  }

  onSubmit() {
    if (this.actividadService.form.valid) {

     if (this.mode==='edit'){
      this.actividadService.updateActividadById(this.actividadService.form.value)
        .subscribe(
            result => {
              if (result.success) {
                this.router.navigate(['/actividad']);
                //this.actividadService.form.reset();
                //this.actividadService.initializeFormGroup();
              } else {
                this.submitted = false;
              }
            },
            error => {
              this.submitted = false;
              // Validation errors
              if (error.status == 422) {
                let errorFields = JSON.parse(error.data.message);
                //this.setFormErrors(errorFields);
                //this.setFormErrors(error.data);
              }
              // Unauthorized Access
              else if (error.status == 401 || error.status == 403) {
               // this.staffService.unauthorizedAccess(error);
              }
              // All other errors
              else {
                this.errorMessage = error.data.message;
              }
            }
        );
  }else{
    this.actividad=this.actividadService.form.value;
    delete this.actividad.key;
    this.actividadService.addActividad(this.actividad)
    .subscribe(
        result => {
          if (result.success) {
            this.router.navigate(['/cliente']);
          } else {
            this.submitted = false;
          }
        },
        error => {
           this.submitted = false;
          // Validation errors
          if (error.status == 422) {
            let errorFields = JSON.parse(error.data.message);
            //this.setFormErrors(errorFields);
            //this.setFormErrors(error.data);
          }
          // Unauthorized Access
          else if (error.status == 401 || error.status == 403) {
           // this.staffService.unauthorizedAccess(error);
          }
          // All other errors
          else {
            this.errorMessage = error.data.message;
          }
        }
    );

  }
    }
  }

}
