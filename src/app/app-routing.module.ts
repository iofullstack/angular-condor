import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CashierComponent } from './cashier/cashier.component'
import { WaiterComponent } from './waiter/waiter.component'
import { CookComponent } from './cook/cook.component'

import { MaterialModule } from './material.module'

const components = [
  CashierComponent,
  WaiterComponent,
  CookComponent
]

const routes: Routes = [
  { path: '', redirectTo: '/cajero', pathMatch: 'full' },
  { path: 'cajero', component: CashierComponent },
  { path: 'mesero', component: WaiterComponent },
  { path: 'cocina', component: CookComponent },
  {
    path: 'clientes',
    loadChildren: './client/client.module#ClientModule'
  },
  {
    path        : 'usuarios',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path        : 'mesas',
    loadChildren: './order/order.module#OrderModule'
  }
]

@NgModule({
  declarations: components,
  imports: [
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule, components]
})
export class AppRoutingModule {}
