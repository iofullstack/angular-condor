export class Menu {
  category: string
  code: string
  name: string
  contain: any[]
  type: any[]
  extra: any[]
  image: string
  prices?: any[]
  discounts?: any[]
  _id?: string

  constructor(
    category: string,
    code: string,
    name: string,
    contain: any[],
    type: any[],
    extra: any[],
    image: string
  ) {
    this.category = category
    this.code = code
    this.name = name
    this.contain = contain
    this.type = type
    this.extra = extra
    this.image = image
  }
}
