import { Component, OnInit } from '@angular/core'
import { Order } from '../order'
import { OrderService } from '../order.service'
import { MatDialog } from '@angular/material'
import { CuentaComponent } from '../cuenta/cuenta.component'
import { PaymentComponent } from '../payment/payment.component'

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  orders: Order[]

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getOrder()
  }

  getOrder(): void {
    this.orderService.getOrder()
        .subscribe(orders => {
          this.orders = orders
        })
  }

  cuentaDialog(order) {
    let dialogRef = this.dialog.open(CuentaComponent, {
      width: '80%',
      data: order
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

  pagoDialog(order) {
    let dialogRef = this.dialog.open(PaymentComponent, {
      width: '80%',
      data: order
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

  cocina(order) {
    this.orderService.printCook(order).subscribe(res => {
      console.log(res)
    })
  }

}
