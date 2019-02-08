import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-client-ci',
  templateUrl: './client-ci.component.html',
  styleUrls: ['./client-ci.component.scss']
})
export class ClientCiComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClientCiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
