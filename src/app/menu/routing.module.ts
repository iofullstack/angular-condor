import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { AddCategoryComponent } from './add-category/add-category.component'
import { AddMenuComponent } from './add-menu/add-menu.component'
import { AddPriceComponent } from './add-price/add-price.component'
import { ListMenuComponent } from './list-menu/list-menu.component'

const routes = [
  { path: 'registrar', component: AddMenuComponent },
  { path: 'categoria', component: AddCategoryComponent },
  { path: 'precios', component: AddPriceComponent },
  { path: 'listar', component: ListMenuComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
