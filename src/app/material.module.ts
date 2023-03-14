import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatRippleModule
} from '@angular/material'

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatRippleModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
