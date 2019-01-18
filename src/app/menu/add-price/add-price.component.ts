import { Component, OnInit } from '@angular/core'
import { MenuService } from '../menu.service'
import { Menu } from '../menu'
import { MatTabChangeEvent } from '@angular/material'

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceComponent implements OnInit {
  dataSource: Menu[]

  constructor(
    private menuService: MenuService
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
