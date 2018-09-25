import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { TranslateModule } from '@ngx-translate/core'
import 'hammerjs'

import { FuseModule } from '@fuse/fuse.module'
import { FuseSharedModule } from '@fuse/shared.module'
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components'

import { fuseConfig } from 'app/fuse-config'

import { AppComponent } from 'app/app.component'
import { LayoutModule } from 'app/layout/layout.module'
import { SampleModule } from 'app/main/sample/sample.module'

/* Material */
import { MaterialModule } from './/material.module'

/* Routing */
import { AppRoutingModule } from './/app-routing.module'

/* Component Café Cóndor */
import { CashierComponent } from './cashier/cashier.component'
import { CookComponent } from './cook/cook.component'
import { WaiterComponent } from './waiter/waiter.component'

/* Module Café Cóndor */
import { MessagesComponent } from './messages/messages.component'

@NgModule({
  declarations: [
    AppComponent,
    CashierComponent,
    CookComponent,
    WaiterComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MaterialModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    SampleModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
