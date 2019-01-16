export class Menu {
  code: string
  name: string
  image: string
  contain: any[]
  extra: any[]
  type: any[]
  category: string

  constructor(
    code: string,
    name: string,
    image: string,
    contain: any[],
    extra: any[],
    type: any[],
    category: string
  ) {
    this.code = code
    this.name = name
    this.image = image
    this.contain = contain
    this.extra = extra
    this.type = type
    this.category = category
  }
}
