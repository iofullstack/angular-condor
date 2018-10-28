import { Table } from './tables/table'

export interface Order {
  numOrder: number,
  numPeople: number,
  carry: Boolean,
  tables: [
    Table
  ]
}
