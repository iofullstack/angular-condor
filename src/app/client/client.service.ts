import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../../environments/environment'

import { Client } from './client.model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsUrl: string

  constructor(
    private http: HttpClient
  ) {
    this.clientsUrl = urljoin(environment.apiUrl, 'clients')
  }

  /** GET users from the server */
  getClients (): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl)
      .pipe(
        tap(clients => console.log(clients)),
        catchError(this.handleError('getClients', []))
      )
  }

  /** POST: add a new client to the server */
  addClient (client: Client): Observable<Client>  {
    const body = JSON.stringify(client)
    return this.http.post<Client> (this.clientsUrl, body, httpOptions).pipe(
      tap((client: Client) => console.log(client)), //this.log(`added Client w/ id=${client.id}`)
      catchError(this.handleError<Client> ('addClient'))
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
