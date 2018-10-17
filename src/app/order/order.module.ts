import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material.module'
import { RoutingModule } from './routing.module'

/* Components */
import { TablesComponent } from './tables/tables.component'
import { PrepareOrderComponent } from './prepare-order/prepare-order.component'

const components = [
  TablesComponent,
  PrepareOrderComponent
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
