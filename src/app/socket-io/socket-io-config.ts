import { InjectionToken } from '@angular/core'

export interface SocketIoConfig {
  url: string
  options?: any
}

export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SOCKET_IO_CONFIG__')
