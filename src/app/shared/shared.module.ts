import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../environments/environment';
import { MaterialModule } from './material.module';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
     
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [
       
    ],
})
export class SharedModule {
}
