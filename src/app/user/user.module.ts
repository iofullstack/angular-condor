import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import 
{ MatButtonModule,
  MatRadioModule,
  MatDividerModule,
  MatFormFieldModule, 
  MatIconModule, 
  MatInputModule, 
  MatSelectModule, 
  MatStepperModule,
  MatDatepickerModule,
  MatTableModule
} from '@angular/material'

/* Components */
import { FuseSharedModule } from '@fuse/shared.module'
import { CreateComponent } from './create/create.component'
import { ListComponent } from './list/list.component'

const routes = [
  { path: 'registrar', component: CreateComponent },
  { path: 'listar', component: ListComponent },
  { path: '', redirectTo:'/usuarios/listar' },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    FuseSharedModule,
    MatTableModule
  ],
  declarations: [CreateComponent, ListComponent]
})
export class UserModule { }
