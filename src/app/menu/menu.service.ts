import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../../environments/environment'

import { Menu } from './menu'
import { Category } from './category'
import { Price } from './price'

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
  getCategoryMenu (): Observable<Category[]> {
    return this.http.get<Category[]>(this.c_menuUrl)
      .pipe(
        tap(_ => console.log('getCategoryMenu')),
        catchError(this.handleError('getCategoryMenu', []))
      )
  }

  /** GET users from the server */
  getMenus (): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.menuUrl)
      .pipe(
        tap(_ => console.log('getMenus')),
        catchError(this.handleError('getmenus', []))
      )
  }

  /** GET users from the server */
  getMenuNonePrice (): Observable<Menu[]> {
    return this.http.get<Menu[]>(urljoin(this.menuUrl, 'price', 'none'))
      .pipe(
        tap(_ => console.log('getMenuNonePrice')),
        catchError(this.handleError('getMenuNonePrice', []))
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

  /** POST: add a new price to the server */
  addPriceMenu (menu: Menu, price: Price): Observable<Price>  {
    const body = JSON.stringify(price)
    return this.http.post<Price | any> ( urljoin(this.menuUrl, menu._id, 'price') , body, httpOptions).pipe(
      tap((_) => console.log('addPriceMenu')),
      catchError(this.handleError<Price> ('addPriceMenu'))
    )
  }

  /** DELETE: price to the server */
  deletePriceMenu (menu:Menu, price: Price): Observable<Price>  {
    return this.http.delete<Price | any> ( urljoin(this.menuUrl, menu._id, 'price', price._id), httpOptions).pipe(
      tap((response) => console.log(response)),
      catchError(this.handleError<Price> ('deletePriceMenu'))
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
