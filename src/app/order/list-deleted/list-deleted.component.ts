import { Component, OnInit } from '@angular/core'
import { OrderService } from '../order.service'
import { Extracto } from './extracto'
import { Saucers } from './saucers'

@Component({
  selector: 'app-list-deleted',
  templateUrl: './list-deleted.component.html',
  styleUrls: ['./list-deleted.component.scss']
})
export class ListDeletedComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight']
  deleted: Extracto[]
  notArchived: Extracto[]

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrderDeleted()
        .subscribe(response => {
          this.deleted = this.prepareDeleted(response.deleted)
          this.notArchived = this.prepareDeleted(response.notArchived)
          // console.log(this.deleted, this.notArchived)
        })
  }

  prepareDeleted(orders) {
    let extractos: Extracto[] = []
    orders.forEach((element) => {
      extractos.push(this.prepareExtracto(element))
    })

    return extractos
  }

  prepareExtracto(data) {
    let extracto: Extracto = {
      fecha: '',
      numOrder : 0,
      carry: false,
      tables: [],
      saucers: [],
      total: 0
    }
    let total: number = 0
    data.saucers.forEach((element) => {
      total += element.price
      let nameSaucer = `${element.menu.name} (${element.namePrice})`
      element.extra.forEach((ex) => {
        nameSaucer += `+ ${ex.price} ${ex.name}`
      })
      extracto.saucers.push({
        quantity: element.quantity,
        nameSaucer,
        price: element.price
      })
    })
    extracto.fecha = data.createdAt
    extracto.numOrder = data.numOrder
    extracto.carry = data.carry
    extracto.tables = data.tables
    extracto.total = total

    return extracto
  }

}
