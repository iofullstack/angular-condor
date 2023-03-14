import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../../../environments/environment'

import { Report } from './report'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportUrl: string

  constructor(
    private http: HttpClient
  ) {
    this.reportUrl = urljoin(environment.apiUrl, 'orders', 'day')
  }

  /** GET report from the server */
  getReportSales (date): Observable<Report[]> {
    return this.http.get<Report[]>(urljoin(this.reportUrl, date))
      .pipe(
        tap(_ => console.log('getReportSales success')),
        catchError(this.handleError('getReportSales', []))
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
