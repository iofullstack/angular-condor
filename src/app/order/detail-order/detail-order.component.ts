import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { Order } from '../order'
import { OrderService } from '../order.service'

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {
  order: Order

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOrderId()
  }

  getOrderId(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.orderService.getOrderId(id)
      .subscribe(order => {
        this.order = order
        // console.log(this.order)
      })
  }

  goBack(): void {
    this.location.back()
  }
}
