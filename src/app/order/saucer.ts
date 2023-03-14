import { Menu } from './menu'

export interface Saucer {
  quantity: number,
  contain: string[],
  type: string,
  price: {
    name: string,
    amount: number,
    createdAt: Date,
    selected: boolean
  },
  menu: Menu
}
