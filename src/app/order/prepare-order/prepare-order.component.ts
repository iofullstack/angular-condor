import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-prepare-order',
  templateUrl: './prepare-order.component.html',
  styleUrls: ['./prepare-order.component.scss'],
  animations : fuseAnimations
})
export class PrepareOrderComponent implements OnInit {

  form: FormGroup;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  test():void {
    // console.log('hola');
  }
  ngOnInit() {
    // Reactive Forms
    this.form = this._formBuilder.group({
        mesas : ['', Validators.required],
        comensales : ['', Validators.required],
    });
  }

  onSubmit(myform:NgForm) {
    let result = this.form.getRawValue();
    console.log(result);
  }

}
