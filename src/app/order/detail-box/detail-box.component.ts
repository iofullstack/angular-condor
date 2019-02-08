import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-detail-box',
  templateUrl: './detail-box.component.html',
  styleUrls: ['./detail-box.component.scss']
})
export class DetailBoxComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'select']

  constructor(
    public dialogRef: MatDialogRef<DetailBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // console.log(this.data)
  }

}
