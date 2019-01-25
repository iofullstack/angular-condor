import { Component, OnInit } from '@angular/core'
import { MenuService } from '../menu.service'
import { Menu } from '../menu'
import { MatTabChangeEvent } from '@angular/material'
import { MatDialog } from '@angular/material'
import { AddExtraComponent } from '../add-extra/add-extra.component'
import { Price } from '../price'
import swal from 'sweetalert2'

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceComponent implements OnInit {
  dataSource: Menu[]
  selectable = true
  removable = true
  
  amount: number
  name: string

  constructor(
    private menuService: MenuService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getMenuNonePrice()
  }

  getMenuNonePrice(): void {
    this.menuService.getMenuNonePrice()
        .subscribe(response => {
          console.log(response)
          this.dataSource = response
        })
  }

  getMenus(): void {
    this.menuService.getMenus()
        .subscribe(response => {
          console.log(response)
          this.dataSource = response
        })
  }

  remove(m: Menu, p: Price): void {
    console.log(p)
    const index = m.prices.indexOf(p)

    if (index >= 0) {
      swal({
        title: '¿Quiere eliminarlo?',
        text: "¡No podras revertir esto!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, eliminar!'
      }).then((result) => {
        console.log(result)
        if (result.value) {
          this.menuService.deletePriceMenu(m, p)
            .subscribe(
              (response) => {
                if(response) {
                  m.prices.splice(index, 1)
                  swal(
                    '¡Eliminado!',
                    'Precio eliminado.',
                    'success'
                  )
                }
              }
            )
        }
      })
    }
  }

  openDialog(m) {
    let dialogRef = this.dialog.open(AddExtraComponent, {
      width: '80%',
      data: { price: this.amount, name: this.name }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let price = { amount: result.price, name: result.name }
        console.log(price)
        this.menuService.addPriceMenu(m, price)
          .subscribe(
            (response) => {
              console.log(response)
              if(response) {
                swal({
                  type: 'success',
                  title: 'Precio guardado',
                  showConfirmButton: false,
                  timer: 1800
                })
                m.prices.push(response)
              }
            }
          )
      }
    })
  }

  onLinkClick(event: MatTabChangeEvent) {
    // console.log('event => ', event);
    // console.log('index => ', event.index);
    // console.log('tab => ', event.tab);
    if (event.index == 0)
      this.getMenuNonePrice()
    if (event.index == 1)
      this.getMenus()
  }

}
