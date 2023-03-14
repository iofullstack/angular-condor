import { ModuleWithProviders, NgModule, NgZone } from '@angular/core'
import { WrappedSocket } from './socket-io.service'
import { SocketIoConfig, SOCKET_CONFIG_TOKEN } from './socket-io-config'

/** Socket factory */
export function SocketFactory(config: SocketIoConfig, ngZone: NgZone) {
  console.log('MODULO --> ', ngZone)
  return new WrappedSocket(config, ngZone)
}

@NgModule({})
export class SocketIoModule {
  static forRoot(config: SocketIoConfig): ModuleWithProviders {
    return {
      ngModule: SocketIoModule,
      providers: [
        { provide: SOCKET_CONFIG_TOKEN, useValue: config },
        {
          provide: WrappedSocket,
          useFactory: SocketFactory,
          deps: [SOCKET_CONFIG_TOKEN]
        }
      ]
    }
  }
}
