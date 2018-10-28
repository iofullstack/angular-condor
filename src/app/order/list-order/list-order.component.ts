import { Component, OnInit } from '@angular/core'
import { Order } from '../order'
import { OrderService } from '../order.service'

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  orders: Order[]

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrder()
  }

  getOrder(): void {
    this.orderService.getOrder()
        .subscribe(orders => {
          this.orders = orders
        })
  }

}
