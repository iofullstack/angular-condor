import { NgModule } from '@angular/core'

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatDialogModule,
  MatTableModule,
  MatCheckboxModule
} from '@angular/material'

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatDialogModule,
  MatTableModule,
  MatCheckboxModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
