import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { OrderService } from '../order.service'

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight']
  total: number = 0
  extracto = {
    fecha: '',
    numOrder : 0,
    carry: false,
    tables: [],
    saucers: [],
    total: 0
  }

  constructor(
    public dialogRef: MatDialogRef<CuentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public orderService: OrderService) { }

  ngOnInit() {
    this.data.saucers.forEach((element) => {
      this.total += element.price
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
    this.extracto.fecha = this.data.createdAt
    this.extracto.numOrder = this.data.numOrder
    this.extracto.carry = this.data.carry
    this.extracto.tables = this.data.tables
    this.extracto.total = this.total
  }

  save() {
    console.log(this.extracto)
    // this.orderService.extract(this.extracto).subscribe(res => {
    //   console.log(res)
    //   this.dialogRef.close(res)
    // })
  }

}
