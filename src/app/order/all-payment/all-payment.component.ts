import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { OrderService } from '../order.service'
import { Order } from '../order'

@Component({
  selector: 'app-all-payment',
  templateUrl: './all-payment.component.html',
  styleUrls: ['./all-payment.component.scss']
})
export class AllPaymentComponent implements OnInit {
  should: number
  paid: number
  ordersTable: Order[]

  constructor(
    public dialogRef: MatDialogRef<AllPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.should = 150
    if(this.data) {
      this.orderService.getOrderTable(this.data.idTable)
        .subscribe(response => {
          this.ordersTable = response
          this.should = this.prepareTotal(this.ordersTable)
        })
    }
  }

  prepareTotal(orders): number {
    let total: number = 0
    orders.forEach((order) => {
      order.saucers.forEach((element) => {
        total += element.price
      })
    })

    return total
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
