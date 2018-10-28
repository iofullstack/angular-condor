export interface Menu {
  name: string,
  src: string,
  contain: any[],
  type: any[],
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
