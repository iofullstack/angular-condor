import { Component, OnInit } from '@angular/core'
import { Order } from '../order'
import { OrderService } from '../order.service'
import { MatDialog } from '@angular/material'
import { CuentaComponent } from '../cuenta/cuenta.component'

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  orders: Order[]
  animal: string
  name: string

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

  openDialog() {
    let dialogRef = this.dialog.open(CuentaComponent, {
      data: {
        myVar: 'MY VAR'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      console.log(result)
    })
  }

}
