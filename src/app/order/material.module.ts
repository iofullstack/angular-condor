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
  MatSlideToggleModule
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
  MatSlideToggleModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
