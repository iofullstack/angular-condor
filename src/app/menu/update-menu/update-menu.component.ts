import {COMMA, ENTER} from '@angular/cdk/keycodes'
import { Component, OnInit, Input } from '@angular/core'
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material'
import { MatChipInputEvent } from '@angular/material'
import { CropperOptions } from 'ngx-cropperjs-wrapper'
import { AddExtraComponent } from '../add-extra/add-extra.component'
import { ActivatedRoute } from '@angular/router'
import { Menu } from '../menu'
import { MenuService }  from '../menu.service'
import swal from 'sweetalert2'

export interface Extra {
  price: number
  name: string
}

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.scss']
})
export class UpdateMenuComponent implements OnInit {
  @Input() menu: Menu
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
    private route: ActivatedRoute,
    private menuService: MenuService,
    public dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMenu()
  }

  getMenu(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.menuService.getMenu(id)
      .subscribe((response) => {
        this.menu = response
        console.log(this.menu)
      })
  }

  onSubmit(): void {
    this.menuService.updateMenu(this.menu)
      .subscribe((res) => {
        console.log(res)
        if(res) {
          swal({
            type: 'success',
            title: 'Menú actualizado',
            showConfirmButton: false,
            timer: 1800
          })
          this.goBack()
        }
      })
  }

  saveImage(): void {
    const d = {
      _id: this.menu._id,
      image: this.dataImage
    }
    this.menuService.updateImageMenu(d)
      .subscribe((res) => {
        console.log(res)
        if(res) {
          swal({
            type: 'success',
            title: 'Imagen actualizado',
            showConfirmButton: false,
            timer: 1800
          })
          this.fileInput = null
          this.dataImage = ''
          this.goBack()
        }
      })
  }

  addContain(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value
    
    // Add our fruit
    if ((value || '').trim()) {
      this.menu.contain.push(value.trim())
    }

    // Reset the input value
    if (input) {
      input.value = ''
    }
  }

  removeContain(tag: string): void {
    const index = this.menu.contain.indexOf(tag)

    if (index >= 0) {
      this.menu.contain.splice(index, 1)
    }
  }

  addType(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value

    // Add our fruit
    if ((value || '').trim()) {
      this.menu.type.push(value.trim())
    }

    // Reset the input value
    if (input) {
      input.value = ''
    }
  }

  removeType(tag: string): void {
    const index = this.menu.type.indexOf(tag)

    if (index >= 0) {
      this.menu.type.splice(index, 1)
    }
  }

  removeExtra(tag: Extra): void {
    const index = this.menu.extra.indexOf(tag)

    if (index >= 0) {
      this.menu.extra.splice(index, 1)
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
        this.menu.extra.push(result)
        // console.log(this.extra)
      }
    })
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  goBack(): void {
    this.location.back();
  }

}
