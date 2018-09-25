import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { Client } from './client'
import { MessageService } from "../message.service"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsUrl = 'api/clients'  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /* GET clients whose name contains search term */
  // searchClients(term: string): Observable<Client[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([])
  //   }
  //   return this.http.get<Client[]>(`${this.clientsUrl}/?name=${term}`).pipe(
  //     tap(_ => this.log(`found heroes matching "${term}"`)),
  //     catchError(this.handleError<Client[]>('searchHeroes', []))
  //   )
  // }

  // /** GET clients from the server */
  // getClients(): Observable<Client[]> {
  //   return this.http.get<Client[]>(this.clientsUrl)
  //     .pipe(
  //       tap(clients => this.log('fetched clients')),
  //       catchError(this.handleError('getClients', []))
  //     )
  // }

  /** GET clients by id. Return `undefined` when id not found */
  getClientNo404<Data>(id: number): Observable<Client>  {
    const url = `${this.clientsUrl}/?id=${id}`
    return this.http.get<Client[]>(url)
      .pipe(
        map(client => client[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`
          this.log(`${outcome} client id=${id}`)
        }),
        catchError(this.handleError<Client> (`getHero id=${id}`))
      )
  }

  /** GET client by id. Will 404 if id not found */
  // getClient(id: number): Observable<Client>  {
  //   const url = `${this.clientsUrl}/${id}`
  //   return this.http.get<Client> (url).pipe(
  //     tap(_ => this.log(`fetched client id=${id}`)),
  //     catchError(this.handleError<Client> (`getClient id=${id}`))
  //   )
  // }

  //////// Save methods //////////

  /** POST: add a new client to the server */
  addClient (client: Client): Observable<Client>  {
    return this.http.post<Client> (this.clientsUrl, client, httpOptions).pipe(
      tap((client: Client) => this.log(`added Client w/ id=${client.id}`)),
      catchError(this.handleError<Client> ('addClient'))
    )
  }

  /** PUT: update the hero on the server */
  // updateHero (hero: Hero): Observable<any> {
  //   return this.http.put(this.clientsUrl, hero, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   )
  // }

  /** DELETE: delete the hero from the server */
  // deleteHero (hero: Hero | number): Observable<Client>  {
  //   const id = typeof hero === 'number' ? hero : hero.id
  //   const url = `${this.clientsUrl}/${id}`

  //   return this.http.delete<Client> (url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Client> ('deleteHero'))
  //   )
  // }

  /** Log a ClientService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ClientService: ${message}`)
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
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
