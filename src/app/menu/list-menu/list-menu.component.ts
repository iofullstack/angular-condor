import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { MenuService } from '../menu.service'
import { Menu } from '../menu'

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements OnInit {
  displayedColumns: string[] = ['picture', 'code', 'name']
  dataSource: MatTableDataSource<Menu>
  menus: Menu[]

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private menuService: MenuService
  ) {
  }
  
  ngOnInit() {
    this.getMenus()
  }

  getMenus(): void {
    this.menuService.getMenus()
        .subscribe(response => {
          this.menus = response
          this.dataSource = new MatTableDataSource(this.menus)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
