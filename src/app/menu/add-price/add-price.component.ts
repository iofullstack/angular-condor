import { Component, OnInit } from '@angular/core'
import { MenuService } from '../menu.service'

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.getMenuNonePrice()
    this.getMenus()
  }

  getMenuNonePrice(): void {
    this.menuService.getMenuNonePrice()
        .subscribe(response => {
          console.log(response)
        })
  }

  getMenus(): void {
    this.menuService.getMenus()
        .subscribe(response => {
          console.log(response)
        })
  }

}
