import { SelectionModel } from '@angular/cdk/collections'
import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { OrderService } from '../order.service'
import swal from 'sweetalert2'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'] // 'select',
  selection = new SelectionModel(true, []);
  total: number = 0
  total2: number = 0
  saucers = []
  pago = {
    _id: '',
    fecha: '',
    numOrder : '',
    carry: false,
    tables: [],
    saucers: [],
    total: 0
  }
  prepare = []

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.saucers.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.data.saucers.forEach(row => this.selection.select(row));
  }

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.saucers = this.data.saucers
    this.saucers.forEach((element) => {
      this.total += element.price
      let nameSaucer = `${element.menu.name} (${element.namePrice})`
      element.extra.forEach((ex) => {
        nameSaucer += `+ ${ex.price} ${ex.name}`
      })
      this.pago.saucers.push({
        quantity: element.quantity,
        nameSaucer,
        price: element.price
      })
    })
    this.pago._id = this.data._id
    this.pago.fecha = this.data.createdAt
    this.pago.numOrder = this.data.numOrder
    this.pago.carry = this.data.carry
    this.pago.tables = this.data.tables
    this.pago.total = this.total
    this.pago.saucers = this.saucers
  }

  save(refresh = false) {
    this.pago.saucers = this.prepare
    this.pago.total = this.total2
    this.orderService.printPago(this.pago).subscribe(res => {
      if(refresh)
        this.dialogRef.close('recargar')
      else
        this.dialogRef.close(res)
    })
  }

  prepararPago(element) {
    let copia = JSON.parse(JSON.stringify(element))
    let nameSaucer = `${copia.menu.name} (${copia.namePrice})`
    copia.extra.forEach((ex) => {
      nameSaucer += `+ ${ex.price} ${ex.name}`
    })
    
    copia.nameSaucer = nameSaucer
    let repite = false
    let repite2 = false
    if(copia.quantity > 1) {
      if(this.prepare.length > 0) {
        this.prepare.forEach((el, index) => {
          if(el._id === copia._id) {
            // if(el.quantity <  copia.quantity) {
              copia.price /= copia.quantity
              this.prepare[index].quantity = el.quantity + 1
              this.prepare[index].price = this.prepare[index].price + copia.price
              this.total2 += copia.price
            // }
            repite = true
          }
        })
        if(!repite) {
          copia.price /= copia.quantity
          copia.quantity = 1
          this.total2 += copia.price
          this.prepare.push(copia)
        }
      }
      else {
        copia.price /= copia.quantity
        copia.quantity = 1
        this.total2 += copia.price
        this.prepare.push(copia)
      }
    } else {
      if(this.prepare.length > 0) {
        this.prepare.forEach((el, index) => {
          if(el._id === copia._id){
            copia.price /= copia.quantity
            this.prepare[index].quantity = el.quantity + 1
            this.prepare[index].price = this.prepare[index].price + copia.price
            this.total2 += copia.price
            repite2 = true
          }
        })
        if(!repite2) {
          this.total2 += copia.price
          this.prepare.push(copia)
        }
      }
      else {
        this.total2 += copia.price
        this.prepare.push(copia)
      }
    }
    // console.log(element)
    this.quitarSaucer(element, copia.price)
  }

  quitarSaucer(saucer, price) {
    // console.log(this.data.saucers, saucer)
    const index = this.data.saucers.indexOf(saucer)

    if (index >= 0) {
      if(this.data.saucers[index].quantity > 0) {
        this.data.saucers[index].quantity--
        this.data.saucers[index].price -= price
        if(this.data.saucers[index].quantity == 0) {
          this.data.saucers = this.data.saucers.filter(h => h != saucer)
        }
      }
    } else {
      this.data.saucers = this.data.saucers.filter(h => h != saucer)
    }

    if(!this.data.saucers.length) {
      this.orderService.getHideOrderId(this.data._id).subscribe(res => {
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
          this.save(true)
          this.dialogRef.close('recargar')
        }
      })
    }
  }

}
