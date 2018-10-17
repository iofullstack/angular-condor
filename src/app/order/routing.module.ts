import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TablesComponent } from './tables/tables.component'
// import { MaterialModule } from './material.module'

const routes = [
  { path: '', component: TablesComponent }
  // { path: '', redirectTo:'/mesas/listar' }
]

@NgModule({
  imports: [
    // MaterialModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
