import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../../../environments/environment'

import { Table } from './table'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private tableUrl: string

  constructor(
    private http: HttpClient
  ) {
    this.tableUrl = urljoin(environment.apiUrl, 'tables')
  }

  /** GET tables from the server */
  getTables (): Observable<Table[]> {
    return this.http.get<Table[]>(this.tableUrl)
      .pipe(
        tap(tables => console.log(tables)),
        catchError(this.handleError('getTables', []))
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
