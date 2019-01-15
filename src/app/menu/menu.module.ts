import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material.module'
import { RoutingModule } from './routing.module'

/* NgModel lives here */
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

/* Components */
import { AddCategoryComponent } from './add-category/add-category.component'
import { AddMenuComponent } from './add-menu/add-menu.component'
import { AddPriceComponent } from './add-price/add-price.component'
import { ListMenuComponent } from './list-menu/list-menu.component'

const components = [
  AddCategoryComponent,
  AddMenuComponent,
  AddPriceComponent,
  ListMenuComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  exports: components
})
export class MenuModule { }
