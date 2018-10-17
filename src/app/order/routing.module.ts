import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TablesComponent } from './tables/tables.component'
import { PrepareOrderComponent } from './prepare-order/prepare-order.component'

const routes = [
  { path: 'mesas', component: TablesComponent },
  { path: 'preparar', component: PrepareOrderComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
