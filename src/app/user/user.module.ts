import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule } from '@angular/material';

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
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    FuseSharedModule
  ],
  declarations: [CreateComponent]
})
export class UserModule { }
