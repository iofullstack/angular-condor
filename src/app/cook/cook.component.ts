import { Component, OnInit } from '@angular/core'
import { OrderService } from '../order/order.service'
import { Order } from '../order/order'
import { SocketioService } from '../socketio.service'

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.scss']
})
export class CookComponent implements OnInit {
  orders: Order[]

  constructor(
    private orderService: OrderService,
    private socket: SocketioService
  ) { }

  ngOnInit() {
    this.getOrder()
    this.socket.on('refreshTables', () => {
      this.getOrder()
    })
  }

  getOrder(): void {
    this.orderService.getOrderCook()
        .subscribe(orders => {
          this.orders = orders
        })
  }

  hideOrder(id: string): void {
    console.log(id)
  }
}
