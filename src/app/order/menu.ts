export interface Menu {
  name: string,
  src: string,
  contain: string[],
  type: string,
  prices: [
    {
      name: string,
      amount: number,
      createdAt: Date
    }
  ]
}
