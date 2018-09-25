import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CashierComponent } from './cashier/cashier.component'
import { WaiterComponent } from './waiter/waiter.component'
import { CookComponent } from './cook/cook.component'

// import { ClientModule } from './client/client.module'

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
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
