import { Table } from './tables/table'

export interface Order {
  _id?: string,
  numOrder: number,
  numPeople: number,
  carry: Boolean,
  tables: [
    Table
  ]
}
