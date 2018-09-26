import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms' // <-- NgModel lives here

import { CreateComponent } from './create/create.component'
import { ListComponent } from './list/list.component'

/* Material Modules */
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

const components = [
  CreateComponent,
  ListComponent
]

const routes = [
  { path: '', component: ListComponent },
  { path: 'registrar', component: CreateComponent }
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    modules
  ],
  exports: [ components, modules ]
})
export class ClientModule { }
