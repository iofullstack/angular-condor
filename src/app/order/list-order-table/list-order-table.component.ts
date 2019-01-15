import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-list-order-table',
  templateUrl: './list-order-table.component.html',
  styleUrls: ['./list-order-table.component.scss']
})
export class ListOrderTableComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListOrderTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

}
