import { Injectable, NgZone } from '@angular/core'
import { Socket } from './socket-io/index'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketioService extends Socket {

  constructor(private _ngZone: NgZone) {
    super({ url: environment.socketUrl, options: {} }, _ngZone)
  }

  getMessage() {
    return this.fromEvent<any>('msg')
      .pipe(
        tap(data => data.msg),
        catchError(this.handleError('getMessage', []))
      )
  }

  sendMessage(msg: string) {
    this.emit('msg', msg)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error) // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
