import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CookComponent } from './cook/cook.component'

import { MaterialModule } from './material.module'

const components = [
  CookComponent
]

const routes: Routes = [
  { path: '', redirectTo: '/cocina', pathMatch: 'full' },
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
    path        : 'orden',
    loadChildren: './order/order.module#OrderModule'
  }
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule, components]
})
export class AppRoutingModule {}
