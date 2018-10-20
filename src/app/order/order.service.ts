import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../../environments/environment'

import { Menu } from './menu'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private menuUrl: string

  constructor(
    private http: HttpClient
  ) {
    this.menuUrl = urljoin(environment.apiUrl, 'menu')
  }

  /** GET all menu from the server */
  getMenus (): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.menuUrl)
      .pipe(
        tap(menu => console.log(menu)),
        catchError(this.handleError('getMenus', []))
      )
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
      console.error(error) // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`)
  
      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

}
