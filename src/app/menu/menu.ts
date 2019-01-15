export interface Menu {
  name: string,
  src: string,
  contain: any[],
  extra: any[],
  type: any[],
  price: number,
  prices: [
    {
      name: string,
      amount: number,
      createdAt: Date,
      selected: boolean
    }
  ],
  count: number,
  selected: boolean
}
