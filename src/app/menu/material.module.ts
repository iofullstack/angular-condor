import { NgModule } from '@angular/core'

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule
} from '@angular/material'

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
