export interface Report {
  sales: [
    {
      _id: string,
      name: string,
      price: number,
      quantity: number
    }
  ],
  extras: [
    {
      _id: string,
      name: string,
      price: number,
      quantity: number
    }
  ],
  totalExtras: number,
  totalSales: number
}
