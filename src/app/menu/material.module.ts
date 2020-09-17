import { NgModule } from '@angular/core'

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule,
  MatTabsModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material'

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule,
  MatTabsModule,
  MatPaginatorModule,
  MatTableModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
