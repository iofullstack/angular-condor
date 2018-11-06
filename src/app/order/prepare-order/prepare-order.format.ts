export const PrepareOrderFormat = {
  formatting: (prod: any)=>{
    let prodFormat = []

    prod.forEach(element => {
      let product:any = element
      let contains = []
      let extras = []
      let prices = []
      let types = []
      if( product.type.length !== 0 ) {
        product.type.forEach( (typeName, index) => {
          if(index === 0) {
            types.push({
              name: typeName,
              selected: true
            })
          } else{
            types.push({
              name: typeName,
              selected: false
            })
          }
        })
        product.type = types
      }
      if( product.contain.length !== 0 ) {
        product.contain.forEach( (containName) => {
          contains.push({
            name: containName,
            selected: true,
          })
        })
        product.contain = contains
      }
      if( product.extra.length !== 0 ) {
        product.extra.forEach( (obj)=>{
          extras.push({
            name: obj.name,
            price: obj.price,
            selected: false,
          })
        })
        product.extra = extras
      }

      if( product.prices.length !== 0 ) {
        product.prices.forEach( (priceElement, index)=>{
          if(index == 0) {
            prices.push({
              ...priceElement,
              selected: true
            })
          } else{
            prices.push({
              ...priceElement,
              selected: false
            })
          }
        })
        product.prices = prices
        console.log(product)
      }
      if (product.prices.length == 0)
        product.price = 0
      else
        product.price = product.prices[0].amount
      product.selected = false
      prodFormat.push(product)
    })
    return prodFormat
  }
}
