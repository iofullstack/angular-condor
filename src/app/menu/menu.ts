export class Menu {
  category: string
  code: string
  name: string
  contain: any[]
  type: any[]
  extra: any[]
  image: string

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
