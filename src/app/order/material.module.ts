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
  MatTableModule
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
  MatTableModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
