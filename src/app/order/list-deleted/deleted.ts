import { Order } from '../order'

export interface Deleted {
  deleted: Order[],
  notArchived: Order[]
}
