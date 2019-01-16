import { NgModule } from '@angular/core'

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material'

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSelectModule,
  MatDialogModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
