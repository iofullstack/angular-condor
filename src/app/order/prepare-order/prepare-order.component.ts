import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'
import { fuseAnimations } from '@fuse/animations'
import { ActivatedRoute } from '@angular/router'
import { Table } from '../tables/table'
import { Menu } from '../menu'
import { TableService } from '../tables/table.service'
import { OrderService } from '../order.service'

@Component({
  selector: 'app-prepare-order',
  templateUrl: './prepare-order.component.html',
  styleUrls: ['./prepare-order.component.scss'],
  animations : fuseAnimations
})
export class PrepareOrderComponent implements OnInit {
  tables: Table[] = [
    {
      capacity: 4,
      numTable: 'm-02'
    }
  ]
  menus: Menu[]
  form: FormGroup

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private tableService: TableService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  test():void {
    // console.log('hola')
  }
  ngOnInit() {
    // Reactive Forms
    this.form = this._formBuilder.group({
        mesas : ['', Validators.required],
        comensales : ['', Validators.required],
    })

    this.getTable()
    this.getMenus()
  }

  getTable(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.tableService.getTable(id)
        .subscribe(table => {
          this.tables.push(table)
          console.log(this.tables)
        })
  }

  getMenus(): void {
    this.orderService.getMenus()
        .subscribe(menus => {
          this.menus = menus
          console.log(this.menus)
        })
  }

  onSubmit(myform:NgForm) {
    let result = this.form.getRawValue()
    console.log(result)
  }

}
