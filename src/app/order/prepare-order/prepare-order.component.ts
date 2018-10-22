import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'
import { fuseAnimations } from '@fuse/animations'
import { ActivatedRoute } from '@angular/router'
import { Table } from '../tables/table'
import { cMenu } from '../cmenu'
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
  tables: Table[] = []
  menus: Menu[]
  c_menu: cMenu[]
  form: FormGroup
  order = {
    numOrder: 0,
    numPeople: 0,
    tables: [],
    saucers: []
  }

  /* Cant Comensales */
  comensales = 0

  products = [
    /*  product 1 */
    {
      name: "Capussino",
      /* Contenido del plato */
      contain:[
        {
          name:"Caliente",
          selected: true,
        },
        {
          name:"Leche",
          selected: true,
        },
        {
          name:"Crema",
          selected: true,
        },
      ],
      /* Options precios */
      prices:[
        {
          name:"Promocion",
          value: 20,
          selected: true,
        },
        {
          name:"Pension",
          value: 30,
          selected: true,
        },
        {
          name:"Empleado",
          value: 25,
          selected: true,
        },
      ],
      count:0,
    },
    /*  product 2 */
    {
      name: "Cafe",
      /* Sabores del Plato */
      type:[
        {
          name:"Caliente",
          selected: false,
        },
        {
          name:"Frio",
          selected: false,
        },
        {
          name:"Tibio",
          selected: false,
        }        
      ],
      /* Options precios */
      prices: [
        {
          name:"Promocion",
          value: 20,
          selected: true,
        },
        {
          name:"Pension",
          value: 30,
          selected: true,
        },
        {
          name:"Empleado",
          value: 25,
          selected: true,
        }
      ],
      count:0,
    },
  ]

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

  ngOnInit() {
    // Reactive Forms
    this.form = this._formBuilder.group({
        mesas : ['', Validators.required],
        comensales : ['', Validators.required],
    })
    this.getTable()
    this.getcMenu()
    this.getMenus()
    /*
    */
  }

  getTable(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.tableService.getTable(id)
        .subscribe(table => {
          this.tables.push(table)
          this.order.tables = this.tables
        })
  }

  getcMenu(): void {
    this.orderService.getcMenu()
        .subscribe(c_menu => {
          this.c_menu = c_menu
          console.log(this.c_menu)
        })
  }

  getMenus(): void {
    this.orderService.getMenus()
        .subscribe(menus => {
          this.menus = menus
          console.log(this.menus)
        })
  }

  /* methods ui */
  addComensal():void {
    this.comensales+=1;
  }
  removeComensal():void {
    if(this.comensales > 0){
      this.comensales-=1;
    }
  }
  addCount(indexProduct):void {
    this.products[indexProduct].count+=1;

  }
  removeCount(indexProduct):void {
    if(this.products[indexProduct].count > 0){
      this.products[indexProduct].count-=1;
    }
  }
  toggleContainProduct(indexProduct, indexContain):void {
    //console.log(indexProduct, indexContain);
    let product = this.products[indexProduct];
    let value = product.contain[indexContain].selected;
    product.contain[indexContain].selected = !value;
  }
  toggleTypeProduct(indexProduct,indexType):void {
    //console.log(indexProduct, indexType);
    let product = this.products[indexProduct];
    product.type.forEach((type,index)=>{
      if(indexType === index){
        type.selected = true; 
      }else{
        type.selected = false;
      }
    });
  }

  togglePriceProduct(indexProduct, indexPrice):void {
    //console.log(indexProduct, indexPrice);
    let product = this.products[indexProduct];
    product.prices.forEach((price,index)=>{
      if(indexPrice === index){
        price.selected = true; 
      }else{
        price.selected = false;
      }
    });
  }
  pedido(indexProduct):void {
    let productFinal = this.products[indexProduct];
    if(productFinal.contain){
      console.log('product contain')
    }else{
      console.log('product type')
    }
  }

  onSubmit(myform:NgForm) {
    let result = this.form.getRawValue()
    console.log(result)
  }

}
