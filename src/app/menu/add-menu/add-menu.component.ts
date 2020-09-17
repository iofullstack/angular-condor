import {COMMA, ENTER} from '@angular/cdk/keycodes'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { MatChipInputEvent } from '@angular/material'
import { NgForm } from '@angular/forms'
import { CropperOptions } from 'ngx-cropperjs-wrapper'
import { Menu } from '../menu'
import { Category } from '../category'
import { MenuService } from '../menu.service'
import { AddExtraComponent } from '../add-extra/add-extra.component'
import swal from 'sweetalert2'

export interface Extra {
  price: number
  name: string
}

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  visible = true
  selectable1 = true
  removable1 = true
  selectable2 = true
  removable2 = true
  selectable3 = true
  removable3 = true
  addOnBlur1 = true
  addOnBlur2 = true
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]
  contain: string[] = []
  type: string[] = []
  extra: Extra[] = []

  menuCode: string
  menuName: string

  selectedValue: string
  categorys: Category[] = []

  price: number
  name: string

  public fileInput: File = null
  public dataImage: any = ''
  // Config for cropper.js (see official cropper.js repo for complete list of available options)
  public options = {
    minCropWidth: 100, // Implemented in wrapper (not supported in cropper.js)
    minCropHeight: 100, // Implemented in wrapper (not supported in cropper.js)
    movable: false,
    scalable: false,
    zoomable: false,
    viewMode: 3,
    aspectRatio: 1,
  } as CropperOptions

  constructor(
    private menuService: MenuService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCategoryMenu()
  }

  getCategoryMenu(): void {
    this.menuService.getCategoryMenu()
        .subscribe(response => {
          this.categorys = response
        })
  }

  addContain(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value
    
    // Add our fruit
    if ((value || '').trim()) {
      this.contain.push(value.trim())
    }

    // Reset the input value
    if (input) {
      input.value = ''
    }
  }

  removeContain(tag: string): void {
    const index = this.contain.indexOf(tag)

    if (index >= 0) {
      this.contain.splice(index, 1)
    }
  }

  addType(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value

    // Add our fruit
    if ((value || '').trim()) {
      this.type.push(value.trim())
    }

    // Reset the input value
    if (input) {
      input.value = ''
    }
  }

  removeType(tag: string): void {
    const index = this.type.indexOf(tag)

    if (index >= 0) {
      this.type.splice(index, 1)
    }
  }

  removeExtra(tag: Extra): void {
    const index = this.extra.indexOf(tag)

    if (index >= 0) {
      this.extra.splice(index, 1)
    }
  }

  // Image //
  onFilePick(event: any) {
    // Feed selected file to cropper
    this.fileInput = event.target.files.item(0)
    if(this.fileInput === null)
      this.dataImage = ''
  }

  onFail(error) {
    console.error(error)
  }

  onFileChange(file: File) {
    // console.log(file)
    // TODO: upload file to backend
    this.getBase64(file).then(
      data => this.dataImage = data
    )
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddExtraComponent, {
      width: '80%',
      data: { price: this.price, name: this.name }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // console.log(result)
        this.extra.push(result)
        // console.log(this.extra)
      }
    })
  }

  onSubmit(form: NgForm) {
    const m = new Menu (
      form.value.category,
      form.value.code,
      form.value.name,
      this.contain,
      this.type,
      this.extra,
      this.dataImage
    )
    // console.log(m)
    this.menuService.addMenu(m)
        .subscribe(
          (response) => {
            if(response) {
              swal({
                type: 'success',
                title: 'Guardado en menú',
                showConfirmButton: false,
                timer: 1800
              })
              this.contain = []
              this.type = []
              this.extra = []
              this.fileInput = null
              this.dataImage = ''
              form.resetForm()
            } else {
              // console.log(response)
              swal({
                type: 'error',
                title: 'Puede que la imagen esté demasiado grande, intente de nuevo',
                showConfirmButton: false,
                timer: 2500
              })
            }
          }
        )
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  }
}