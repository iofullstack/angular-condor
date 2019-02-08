import { Component, OnInit, Input } from '@angular/core'
import { Order } from '../order'
import { OrderService } from '../order.service'
import { TableService } from '../tables/table.service'
import { MatDialog } from '@angular/material'
import { CuentaComponent } from '../cuenta/cuenta.component'
import { PaymentComponent } from '../payment/payment.component'
import swal from 'sweetalert2'

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  orders: Order[]
  @Input() idTable: string

  constructor(
    public dialog: MatDialog,
    private tableService: TableService,
    private orderService: OrderService) { }

  ngOnInit() {
    if (this.idTable)
      this.getOrderTable(this.idTable)
    else
      this.getOrder()
  }

  resetTable(id): void {
    this.tableService.resetTable(id)
        .subscribe(response => {
          // console.log(response)
        })
  }

  getOrderTable(id): void {
    this.orderService.getOrderTable(id)
        .subscribe(orders => {
          this.orders = orders
          if(this.orders.length === 0)
            this.resetTable(id)
        })
  }

  getOrder(): void {
    this.orderService.getOrder()
        .subscribe(orders => {
          this.orders = orders
          // console.log(this.orders)
        })
  }

  cuentaDialog(order) {
    let dialogRef = this.dialog.open(CuentaComponent, {
      width: '80%',
      data: order
    })

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
    })
  }

  pagoDialog(order) {
    let dialogRef = this.dialog.open(PaymentComponent, {
      width: '80%',
      data: order
    })

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
    })
  }

  cocina(order) {
    this.orderService.printCook(order).subscribe(res => {
      // console.log(res)
    })
  }

  hideOrder(id) {
    swal({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto, esta acción ocultará el pedido!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Archivar pedido',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.orderService.getHideOrderId(id).subscribe(res => {
          if(res.error)
            swal(
              '¡Algo esta mal!',
              res.message,
              'warning'
            )
          else {
            swal(
              '¡Pedido Archivado!',
              res.message,
              'success'
            )
            if (this.idTable)
              this.getOrderTable(this.idTable)
            else
              this.getOrder()
          }
        })
      }
    })
  }
}
