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
import { MaterialModule } from './material.module'

/* Routing */
import { AppRoutingModule } from './app-routing.module'

/* Module Café Cóndor */
import { MessagesComponent } from './messages/messages.component'
// import { CookComponent } from './cook/cook.component'
// import { WaiterComponent } from './waiter/waiter.component'
// import { CashierComponent } from './cashier/cashier.component'

import { MAT_DATE_LOCALE } from '@angular/material'

import { SocketIoModule } from './socket-io/socket-io.module'
import { SocketIoConfig } from './socket-io/socket-io-config'

import { SocketioService } from './socketio.service'

const config: SocketIoConfig = { url: 'http://localhost:3500', options: {} }

@NgModule({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue:'es'},
    SocketioService
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    // CookComponent,
    // WaiterComponent,
    // CashierComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot(),

    SocketIoModule.forRoot(config),

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
