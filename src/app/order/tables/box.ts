export interface Box {
  day: string,
  period: [
    {
      amount: number,
      opening: string,
      closing: string,
      accumulated: number,
    }
  ]
}
