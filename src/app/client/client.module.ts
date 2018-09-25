import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms' // <-- NgModel lives here

import { CreateComponent } from './create/create.component'

const components = [
  CreateComponent
]

const routes = [
  { path: '', component: CreateComponent },
  { path: 'registrar', component: CreateComponent },
]

@NgModule({
  declarations: components,
  imports: [
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: components
})
export class ClientModule { }
