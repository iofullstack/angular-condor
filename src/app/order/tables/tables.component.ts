import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Table } from './table'
import { TableService } from './table.service'
import { SocketioService } from '../../socketio.service'

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
  ]

  constructor(
    private tableService: TableService,
    private router: Router,
    private socket: SocketioService
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
          // console.log(this.dataSource)
        })
  }

  resetTable(id): void {
    this.tableService.resetTable(id)
        .subscribe(response => {
          console.log(response)
        })
  }

  onSelect(_id): void {
    this.router.navigate(['/orden/preparar', _id])
    // this.router.navigate(['/orden/preparar'])
  }

  occupied(obj): String {
    return obj.numTable
  }

}
