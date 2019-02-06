import { Component, OnInit } from '@angular/core'
import { OrderService } from '../order/order.service'
import { Order } from '../order/order'
import { SocketioService } from '../socketio.service'
import swal from 'sweetalert2'

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

  deleteOrder(id: string): void {
    swal({
      title: '¿Estás seguro?',
      text: "¡Esta acción cancelará el pedido!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value)
        this.orderService.deleteOrderId(id)
          .subscribe(response => {
            if(response) {
              swal({
                type: 'success',
                title: 'Pedido cancelado',
                showConfirmButton: false,
                timer: 1800
              })
              this.getOrder()
            }
          })
    })
    
  }
}
