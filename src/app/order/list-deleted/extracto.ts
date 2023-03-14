import { Table } from '../tables/table'
import { Saucers } from './saucers'

export interface Extracto {
  fecha: string,
  numOrder: number,
  carry: boolean,
  tables: Table[],
  saucers: Saucers[],
  total: number
}
