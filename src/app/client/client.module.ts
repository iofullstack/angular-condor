import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

/* NgModel lives here */
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CreateComponent } from './create/create.component'
import { ListComponent } from './list/list.component'

/* Material Modules */
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatRippleModule,
  MatTableModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material'

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatRippleModule,
  MatTableModule,
  MatOptionModule,
  MatSelectModule
]

const components = [
  CreateComponent,
  ListComponent
]

const routes = [
  { path: 'registrar', component: CreateComponent },
  { path: 'listar', component: ListComponent },
  { path: '', redirectTo:'/clientes/listar' },
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
