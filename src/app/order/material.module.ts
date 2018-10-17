import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material'

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
