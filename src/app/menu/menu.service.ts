import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../../environments/environment'

import { Menu } from './menu'
import { Category } from './category'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuUrl: string
  private c_menuUrl: string

  constructor(
    private http: HttpClient
  ) {
    this.menuUrl = urljoin(environment.apiUrl, 'menu')
    this.c_menuUrl = urljoin(environment.apiUrl, 'c_menu')
  }

  /** GET users from the server */
  getMenus (): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.menuUrl)
      .pipe(
        tap(_ => console.log('getMenus')),
        catchError(this.handleError('getmenus', []))
      )
  }

  /** POST: add a new menu to the server */
  addMenu (menu: Menu): Observable<Menu>  {
    const body = JSON.stringify(menu)
    return this.http.post<Menu> (this.menuUrl, body, httpOptions).pipe(
      tap((menu: Menu) => console.log(menu)),
      catchError(this.handleError<Menu> ('addMenu'))
    )
  }

  /** POST: add a new menu to the server */
  addCategoryMenu (c_menu: Category): Observable<Category>  {
    const body = JSON.stringify(c_menu)
    return this.http.post<Category | any> (this.c_menuUrl, body, httpOptions).pipe(
      tap((c_menu: Category) => console.log(c_menu)),
      catchError(this.handleError<Category> ('addCategoryMenu'))
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
