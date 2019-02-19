import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter"
import * as Material from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTooltipModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatSnackBarModule,
    Material.MatCardModule,
    Material.MatIconModule,
    Material.MatMenuModule,
    Material.MatAutocompleteModule,
    MatMomentDateModule,
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTooltipModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatSnackBarModule,
    Material.MatCardModule,
    Material.MatIconModule,
    Material.MatMenuModule,
    Material.MatAutocompleteModule,
    MatMomentDateModule,
  ],
  declarations: [],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class MaterialModule { }
