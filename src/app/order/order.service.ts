import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import urljoin from 'url-join'
import { environment } from '../../environments/environment'

import { Menu } from './menu'
import { cMenu } from './cmenu'
import { Order } from './order'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

export interface Extract {
  carry: boolean,
  fecha: string,
  numOrder: number,
  saucers: any[],
  tables: any[],
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private menuUrl: string
  private menuCategoryUrl: string
  private c_menuUrl: string
  private orderUrl: string

  constructor(
    private http: HttpClient
  ) {
    this.menuUrl = urljoin(environment.apiUrl, 'menu')
    this.menuCategoryUrl = urljoin(environment.apiUrl, 'menu/category')
    this.c_menuUrl = urljoin(environment.apiUrl, 'c_menu')
    this.orderUrl = urljoin(environment.apiUrl, 'orders')
  }

  /** GET all menu from the server */
  getMenus (): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.menuUrl)
      .pipe(
        tap(menu => console.log(menu)),
        catchError(this.handleError('getMenus', []))
      )
  }

  /** GET all menu of category from the server */
  getMenusCategory (IdCategory): Observable<Menu[]> {
    return this.http.get<Menu[]>(urljoin(this.menuCategoryUrl, IdCategory))
      .pipe(
        tap(_ => console.log(_)),
        catchError(this.handleError('getMenusCategory', []))
      )
  }

  /** GET all c_menu from the server */
  getcMenu (): Observable<cMenu[]> {
    return this.http.get<cMenu[]>(this.c_menuUrl)
      .pipe(
        tap(c_menu => console.log(c_menu)),
        catchError(this.handleError('getcMenu', []))
      )
  }

  /** GET all order from the server */
  getOrder (): Observable<Order[]> {
    return this.http.get<Order[]>(urljoin(this.orderUrl, 'today'))
      .pipe(
        tap(_ => console.log('Find All Orders')),
        catchError(this.handleError('getOrder', []))
      )
  }

  /** GET all order from the server */
  getOrderTable (id): Observable<Order[]> {
    return this.http.get<Order[]>(urljoin(this.orderUrl, 'today', 'table', id))
      .pipe(
        tap(_ => console.log('Find All Orders match Table')),
        catchError(this.handleError('getOrderTable', []))
      )
  }

  /** GET order by id. Return `undefined` when id not found */
  getOrderIdNo404<Data>(id: string): Observable<Order> {
    const url = `${this.orderUrl}/?id=${id}`
    return this.http.get<Order[]>(url)
      .pipe(
        map(order => order[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`
          console.log(`${outcome} order id=${id}`)
        }),
        catchError(this.handleError<Order>(`getOrder id=${id}`))
      )
  }

  /** GET order by id. Will 404 if id not found */
  getOrderId(id: string): Observable<Order> {
    const url = urljoin(this.orderUrl, id)
    return this.http.get<Order>(url).pipe(
      tap(_ => console.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    )
  }

  getHideOrderId(id: string): Observable<any> {
    const url = urljoin(this.orderUrl, id, 'hide')
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getHideOrderId id=${id}`))
    )
  }

  /** POST: add a new order to the server */
  addOrder (order: Order): Observable<Order>  {
    const body = JSON.stringify(order)
    return this.http.post<Order> (this.orderUrl, body, httpOptions).pipe(
      tap((order: Order) => console.log(order)), //this.log(`added Order w/ id=${order.id}`)
      catchError(this.handleError<Order> ('addOrder'))
    )
  }

  extract (obj: Extract) {
    const body = JSON.stringify(obj)
    const url = urljoin(this.orderUrl, 'extract')

    return this.http.post(url, body, httpOptions).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError<Extract> ('extract'))
    )
  }

  printPago (obj: Extract) {
    const body = JSON.stringify(obj)
    const url = urljoin(this.orderUrl, 'print', 'pago')
    // console.log(url, body)

    return this.http.post(url, body, httpOptions).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError<Extract> ('extract'))
    )
  }

  printCook (obj: Order) {
    const body = JSON.stringify(obj)
    const url = urljoin(this.orderUrl, 'print', 'cook')

    return this.http.post(url, body, httpOptions).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError<Order> ('printCook'))
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
