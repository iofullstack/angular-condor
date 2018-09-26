import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import 
{ MatButtonModule,
  MatRadioModule,
  MatDividerModule,
  MatFormFieldModule, 
  MatIconModule, 
  MatInputModule, 
  MatSelectModule, 
  MatStepperModule,
  MatDatepickerModule 
} from '@angular/material';

/* Components */
import { FuseSharedModule } from '@fuse/shared.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes = [
  { path: '', redirect:'/listar' },
  { path: 'registrar', component: CreateComponent },
  { path: 'listar', component: ListComponent },
];

@NgModule({
  imports: [
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
    FuseSharedModule
  ],
  declarations: [CreateComponent, ListComponent]
})
export class UserModule { }
