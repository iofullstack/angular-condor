import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-add-extra',
  templateUrl: './add-extra.component.html',
  styleUrls: ['./add-extra.component.scss']
})
export class AddExtraComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddExtraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
