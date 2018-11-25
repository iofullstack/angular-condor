import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Table } from './table'
import { MatDialog } from '@angular/material'
import { TableService } from './table.service'
import { SocketioService } from '../../socketio.service'
import { DetailBoxComponent } from '../detail-box/detail-box.component'
import swal from 'sweetalert2'

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [ SocketioService ]
})
export class TablesComponent implements OnInit {
  dataSource: Table[] = [
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 },
    { numTable: '', capacity: 0, occupied: 0 }
  ]

  constructor(
    private tableService: TableService,
    private router: Router,
    private socket: SocketioService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTables()
    this.socket.on('refreshTables', () => {
      this.getTables()
    })
  }

  getTables(): void {
    this.tableService.getTables()
        .subscribe(tables => {
          this.dataSource = tables
          console.log(this.dataSource)
        })
  }

  resetTable(id): void {
    this.tableService.resetTable(id)
        .subscribe(response => {
          console.log(response)
        })
  }
  resetBarra(...ids): void {
    for(let i = 0; i < ids.length; i++) {
      this.tableService.resetTable(ids[i])
        .subscribe(response => {
          console.log(response)
        })
    }
  }

  onSelect(_id): void {
    this.router.navigate(['/orden/preparar', _id])
    // this.router.navigate(['/orden/preparar'])
  }

  occupied(obj): String {
    return obj.numTable
  }

  viewBox(): void {
    this.tableService.getBox()
        .subscribe(response => {
          let dialogRef = this.dialog.open(DetailBoxComponent, {
            width: '80%',
            data: response
          })
          dialogRef.afterClosed().subscribe(result => {
            console.log(result)
          })
        })
  }

  openingBox(): void {
    swal({
      title: 'Ingrese monto para la apertura de caja',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (amount: number) => {
        this.tableService.openingBox(amount)
          .subscribe(response => {
            swal({
              type: 'info',
              title: 'Apertura de caja',
              text: response.message
            })
          })
      },
      allowOutsideClick: () => !swal.isLoading()
    })
  }

  closingBox(): void {
    swal({
      title: '¿Estás seguro?',
      text: "¡Esta acción cerrará la caja!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value)
        this.tableService.closingBox()
            .subscribe(response => {
              swal({
                type: 'info',
                title: 'Cierre de caja',
                text: response.message
              })
            })
    })
  }

}
