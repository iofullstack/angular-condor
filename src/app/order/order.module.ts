import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material.module'
import { RoutingModule } from './routing.module'
import { FlexLayoutModule } from '@angular/flex-layout'

/* NgModel lives here */
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

/* Components */
import { TablesComponent } from './tables/tables.component'
import { PrepareOrderComponent } from './prepare-order/prepare-order.component'
import { ListOrderComponent } from './list-order/list-order.component'
import { DetailOrderComponent } from './detail-order/detail-order.component'
import { CuentaComponent } from './cuenta/cuenta.component'
import { PaymentComponent } from './payment/payment.component'
import { DetailBoxComponent } from './detail-box/detail-box.component'
import { ReportComponent } from './report/report.component'
import { ListOrderTableComponent } from './list-order-table/list-order-table.component'
import { ClientCiComponent } from './client-ci/client-ci.component'
import { ListDeletedComponent } from './list-deleted/list-deleted.component'
import { AllPaymentComponent } from './all-payment/all-payment.component'

const components = [
  TablesComponent,
  PrepareOrderComponent,
  ListOrderComponent,
  DetailOrderComponent,
  CuentaComponent,
  PaymentComponent,
  DetailBoxComponent,
  ReportComponent,
  ListOrderTableComponent,
  ClientCiComponent,
  ListDeletedComponent,
  AllPaymentComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RoutingModule
  ],
  entryComponents: [
    ClientCiComponent,
    CuentaComponent,
    PaymentComponent,
    DetailBoxComponent,
    ReportComponent,
    ListOrderTableComponent,
    ListDeletedComponent,
    AllPaymentComponent
  ],
  exports: components
})
export class OrderModule { }
