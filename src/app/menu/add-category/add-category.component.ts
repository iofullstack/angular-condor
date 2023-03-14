import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import swal from 'sweetalert2'

import { Category } from '../category'
import { MenuService } from '../menu.service'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight']
  dataSource: Category[]

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategory()
  }

  getCategory() {
    this.menuService.getCategoryMenu().subscribe(
      (response) => {
        this.dataSource = response
      }
    )
  }

  onSubmit(form: NgForm) {
    const c = new Category(
      form.value.name
    )

    // console.log(c)
    this.menuService.addCategoryMenu(c)
        .subscribe(
          (response) => {
            if(response) {
              swal({
                type: 'success',
                title: 'Cagetoría guardada correctamente',
                showConfirmButton: false,
                timer: 1800
              })
              this.getCategory()
            }
          }
        )
    form.resetForm();
  }

}
