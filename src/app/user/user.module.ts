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

const routes = [
  { path: '', component: CreateComponent },
  { path: 'registrar', component: CreateComponent },
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
  declarations: [CreateComponent]
})
export class UserModule { }
