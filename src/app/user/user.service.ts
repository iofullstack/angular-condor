import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
 
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../../environments/environment'

import { User } from './user.model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string

  constructor(
    private http: HttpClient
  ) {
    this.usersUrl = urljoin(environment.apiUrl, 'users')
  }

  /** GET users from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(users => console.log(users)),
        catchError(this.handleError('getUsers', []))
      )
  }

  /** POST: add a new user to the server */
  addUser (user: User): Observable<User>  {
    const body = JSON.stringify(user)
    return this.http.post<User> (this.usersUrl, body, httpOptions).pipe(
      tap((user: User) => console.log(user)),
      catchError(this.handleError<User> ('addUser'))
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
  
      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
