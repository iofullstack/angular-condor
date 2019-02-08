import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { OrderService } from '../order.service'
import { Order } from '../order'

@Component({
  selector: 'app-list-order-table',
  templateUrl: './list-order-table.component.html',
  styleUrls: ['./list-order-table.component.scss']
})
export class ListOrderTableComponent implements OnInit {
  ordersTable: Order[]
  viewed: Boolean = false
  extracto = {
    fecha: '',
    numOrder : '',
    carry: false,
    tables: [],
    saucers: [],
    total: 0
  }

  constructor(
    public dialogRef: MatDialogRef<ListOrderTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrderTable(this.data)
        .subscribe(response => {
          if(response.length > 1)
            this.viewed = true
          else {
            this.viewed = false
          }
        })
  }

  allBill(idTable) {
    this.orderService.getOrderTable(idTable)
        .subscribe(response => {
          this.ordersTable = response
          this.prepareExtract(this.ordersTable)
          this.submitExtract()
        })
  }

  prepareExtract(orders) {
    let total = 0
    orders.forEach((order) => {
      order.saucers.forEach((element) => {
        total += element.price
        let nameSaucer = `${element.menu.name} (${element.namePrice})`
        element.extra.forEach((ex) => {
          nameSaucer += `+ ${ex.price} ${ex.name}`
        })
        this.extracto.saucers.push({
          quantity: element.quantity,
          nameSaucer,
          price: element.price
        })
      })
      this.extracto.numOrder += order.numOrder + ', '
    })
    this.extracto.carry = false
    this.extracto.fecha = orders[0].createdAt
    this.extracto.total = total
    this.extracto.tables = orders[0].tables
  }

  submitExtract() {
    // console.log(this.extracto)
    this.orderService.totalExtract(this.extracto).subscribe(res => {
      this.dialogRef.close(res)
    })
  }

}
