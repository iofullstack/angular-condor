import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TablesComponent } from './tables/tables.component'
import { MaterialModule } from './material.module'
import { RoutingModule } from './routing.module'

const components = [
  TablesComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MaterialModule,
    RoutingModule
  ],
  exports: components
})
export class OrderModule { }

// import { NgModule } from '@angular/core'
// import { CommonModule } from '@angular/common'
// import { RouterModule } from '@angular/router'
// import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// /* Components */
// import { TablesComponent } from './tables/tables.component'

// /* Material Modules */
// import {
//   MatButtonModule,
//   MatIconModule,
//   MatInputModule,
//   MatFormFieldModule,
//   MatRippleModule,
//   MatTableModule,
//   MatOptionModule,
//   MatSelectModule 
// } from '@angular/material'

// const modules = [
//   MatButtonModule,
//   MatIconModule,
//   MatInputModule,
//   MatFormFieldModule,
//   MatRippleModule,
//   MatTableModule,
//   MatOptionModule,
//   MatSelectModule
// ]

// const components = [
//   TablesComponent
// ]

// const routes = [
//   { path: 'listar', component: TablesComponent },
//   { path: '', redirectTo:'/mesas/listar' }
// ]

// @NgModule({
//   declarations: components,
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     RouterModule.forChild(routes),
//     modules
//   ],
//   exports: [ components, modules ]
// })
// export class OrderModule { }
