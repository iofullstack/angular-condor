import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'
import { fuseAnimations } from '@fuse/animations'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { Table } from '../tables/table'
import { cMenu } from '../cmenu'
import { Menu } from '../menu'
import { Order } from '../order'
import { Client } from '../../client/client'
import { TableService } from '../tables/table.service'
import { OrderService } from '../order.service'
import { ClientService } from '../../client/client.service'
import { PrepareOrderFormat } from './prepare-order.format'
import { MatDialog } from '@angular/material'
import { ClientCiComponent } from '../client-ci/client-ci.component'
import swal from 'sweetalert2'

@Component({
  selector: 'app-prepare-order',
  templateUrl: './prepare-order.component.html',
  styleUrls: ['./prepare-order.component.scss'],
  animations : fuseAnimations
})
export class PrepareOrderComponent implements OnInit {
  tables: Table[] = []
  menus: Menu[]
  c_menu: cMenu[]
  client: Client
  ci: string
  form: FormGroup
  llevar = false

  order = {
    numOrder: 0,
    numPeople: 0,
    tables: [],
    saucers: []
  }

  prepareOrder = {
    numOrder: 0,
    numPeople: 0,
    carry: false,
    user: '5bddf0970840dc49651cc956',
    tables: [],
    saucers: []
  }

  /* Cant Comensales */
  comensales = 1

  descuento = 0

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private tableService: TableService,
    private orderService: OrderService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // Reactive Forms
    this.form = this._formBuilder.group({
        mesas : ['', Validators.required],
        comensales : ['', Validators.required],
    })
    this.getTable()
    this.getcMenu()
    this.getMenus()
  }

  getTable(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.tableService.getTable(id)
          .subscribe(table => {
            this.tables.push(table)
            this.order.tables = this.tables
          })
    } else {
      this.llevar = true
    }
  }

  getcMenu(): void {
    this.orderService.getcMenu()
        .subscribe(c_menu => {
          this.c_menu = c_menu
        })
  }

  getMenus(): void {
    this.orderService.getMenus()
        .subscribe(menus => {
          this.menus = PrepareOrderFormat.formatting(menus)
          // console.log(this.menus)
        })
  }

  getMenusCategory(id): void {
    this.orderService.getMenusCategory(id)
        .subscribe(menus => {
          this.menus = PrepareOrderFormat.formatting(menus)
        })
  }

  /* methods ui */
  addComensal():void {
    this.comensales+=1
  }
  removeComensal():void {
    if(this.comensales > 1){
      this.comensales-=1
    }
  }
  addCount(indexProduct):void {
    this.menus[indexProduct].count+=1
  }
  removeCount(indexProduct):void {
    if(this.menus[indexProduct].count > 0){
      this.menus[indexProduct].count-=1
    }
  }
  toggleContainProduct(indexProduct, indexContain):void {
    this.menus[indexProduct].selected = false
    //console.log(indexProduct, indexContain)
    let product = this.menus[indexProduct]
    let value = product.contain[indexContain].selected
    product.contain[indexContain].selected = !value
  }
  toggleExtraProduct(indexProduct, indexExtra):void {
    this.clearDiscount(indexProduct)
    this.menus[indexProduct].selected = false
    let product = this.menus[indexProduct]
    let value = product.extra[indexExtra].selected
    product.extra[indexExtra].selected = !value

    if (product.extra[indexExtra].selected)
      this.menus[indexProduct].price += product.extra[indexExtra].price
    else
      this.menus[indexProduct].price -= product.extra[indexExtra].price
    
    this.menus[indexProduct].priceVisible = this.menus[indexProduct].price
  }

  toggleTypeProduct(indexProduct,indexType):void {
    //console.log(indexProduct, indexType)
    let product = this.menus[indexProduct]

    if ( !product.type[indexType].selected )
      this.menus[indexProduct].selected = false

    product.type.forEach((type,index)=>{
      if(indexType === index){
        type.selected = true 
      }else{
        type.selected = false
      }
    })
  }

  togglePriceProduct(indexProduct, indexPrice):void {
    this.clearDiscount(indexProduct)
    let product = this.menus[indexProduct]

    if ( !product.prices[indexPrice].selected ) {
      this.menus[indexProduct].selected = false
      product.prices.forEach((price,index)=>{
        if(price.selected)
          product.price -= this.menus[indexProduct].prices[index].amount
      })
    } else
      product.price -= product.prices[indexPrice].amount

    product.prices.forEach((price,index)=>{
      if(indexPrice === index) {
        price.selected = true
        product.price += price.amount
      } else {
        price.selected = false
      }
    })
    product.priceVisible = product.price
  }

  toggleDiscountProduct(indexProduct, indexDiscount):void {
    this.menus[indexProduct].quantity = 0
    let product = this.menus[indexProduct]
    let porcentaje = 0
    let descuento = 0
    if(product.selected) {
      product.selected = false
      if(product.discounts[indexDiscount].selected) {
        product.price += this.descuento
        product.priceVisible = product.price
        product.discounts[indexDiscount].selected = false
        return
      } else {
        product.discounts.forEach((discount, index)=>{
          if(discount.selected) {
            product.price += this.descuento
            product.priceVisible = product.price
            product.discounts[index].selected = false
          }
        })
      }
    }
    let precio = this.menus[indexProduct].price

    if ( !product.discounts[indexDiscount].selected ) {
      this.menus[indexProduct].selected = false
      product.discounts.forEach((discount,index)=>{
        if(discount.selected) {
          porcentaje = this.menus[indexProduct].discounts[index].percent / 100
          descuento = this.redondeo(precio*porcentaje, 0)
          product.priceVisible += descuento
        }
      })
    } else {
      porcentaje = product.discounts[indexDiscount].percent / 100
      descuento = this.redondeo(precio*porcentaje, 0)
      // console.log(precio,porcentaje,descuento)
      product.priceVisible += descuento
      product.discounts[indexDiscount].selected = false
      return
    }

    product.discounts.forEach((discount,index)=>{
      if(indexDiscount === index) {
        discount.selected = true
        porcentaje = discount.percent / 100
        descuento = this.redondeo(precio*porcentaje, 0)
        // console.log(precio,porcentaje,descuento)
        this.descuento = descuento
        product.priceVisible -= descuento
      } else {
        discount.selected = false
      }
    })
  }

  clearDiscount(indexProduct):void {
    let product = this.menus[indexProduct]
    this.menus[indexProduct].quantity = 0
    if(product.selected) {
      product.discounts.forEach((discount)=>{
        if(discount.selected) {
          product.price += this.descuento
          product.priceVisible = product.price
        }
      })
    }
    product.discounts.forEach((discount)=>{
      discount.selected = false
    })
  }

  redondeo(numero, decimales) {
    let flotante = parseFloat(numero)
    let resultado = Math. round(flotante*Math. pow(10,decimales))/Math. pow(10,decimales)
    return resultado
  }

  pedido(indexProduct):void {
    this.menus[indexProduct].selected = true
    this.menus[indexProduct].price = this.menus[indexProduct].priceVisible
    let productF = JSON.stringify(this.menus[indexProduct])
    let cortar = productF.indexOf(',"quantity":')
    let productFinal = productF.substring(0, cortar) + '}'
    if(this.order.saucers.length == 0) {
      let save = {
        product: JSON.parse(productFinal),
        quantity: 1
      }
      this.order.saucers.push(save)
      this.menus[indexProduct].quantity = 1
    } else {
      let index = this.checkRepeat(productFinal)
      if(index === -1) {
        let save = {
          product: JSON.parse(productFinal),
          quantity: 1
        }
        this.order.saucers.push(save)
        this.menus[indexProduct].quantity = 1
      } else {
        this.order.saucers[index].quantity+=1
        this.menus[indexProduct].quantity = this.order.saucers[index].quantity
      }
    }
    // console.log(this.order.saucers)
  }

  checkRepeat(obj) {
    // console.log(obj)
    let position = -1
    if(this.order.saucers.length === 0){
      return position
    }else{
      this.order.saucers.forEach( (saucer, index)=>{
        if(JSON.stringify(saucer.product) === obj){
          position =  index
        }
      })
      return position
    }
  }

  finishPedido(){
    this.prepareOrder.numPeople = this.comensales
    this.prepareOrder.tables = this.tables

    let saucers = []
    this.order.saucers.forEach((saucer, index)=>{
      // console.log(saucer)
      let prepare = {
        quantity: 0,
        contain: [],
        extra: [],
        type: '',
        namePrice: '',
        price: saucer.product.price,
        menu: ''
      }
      prepare.quantity = saucer.quantity
      prepare.menu = saucer.product._id
      
      saucer.product.contain.forEach((element) => {
        if(element.selected)
          prepare.contain.push(element.name)
      })
      saucer.product.type.forEach((element) => {
        if(element.selected) {
          prepare.type = element.name
          return
        }
      })
      saucer.product.prices.forEach((element) => {
        if(element.selected) {
          prepare.namePrice = element.name
          return
        }
      })
      saucer.product.prices.forEach((element) => {
        if(element.selected) {
          prepare.price *= prepare.quantity
          return
        }
      })
      saucer.product.extra.forEach((element) => {
        if(element.selected) {
          prepare.extra.push({name: element.name, price: element.price})
        }
      })

      saucers.push(prepare)
    })
    this.prepareOrder.carry = this.llevar
    this.prepareOrder.saucers = saucers
    // console.log('pedido final', this.prepareOrder)
    this.addOrder(this.prepareOrder)
  }

  addOrder(order): void {
    // console.log('Subir una Orden: ', order)
    this.orderService.addOrder(order as Order)
      .subscribe(response => {
        if(order.carry)
          this.router.navigate(['/orden/listar'])
        else
          this.router.navigate(['/orden/mesas'])
        // console.log(response)
      })
  }

  onSubmit(myform:NgForm) {
    let result = this.form.getRawValue()
  }

  viewClient(indexProduct, indexDiscount): void {
    this.clearDiscount(indexProduct)
    let dialogRef = this.dialog.open(ClientCiComponent, {
      width: '80%',
      data: { ci: this.ci }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.clientService.getClientCI(result)
          .subscribe(response => {
            if(response) {
              this.toggleDiscountProduct(indexProduct, indexDiscount)
              swal({
                type: 'success',
                title: 'Descuento a: ' + response.firstName + ' ' + response.lastName,
                showConfirmButton: false,
                timer: 2500
              })
            } else {
              swal({
                type: 'error',
                title: 'No se encontró un cliente con ese CI/NIT/PASAPORTE',
                showConfirmButton: false,
                timer: 1800
              })
            }
          })
      }
    })
  }

}
