import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router'

import { Client } from '../client.model'
import { ClientService } from '../client.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private clientService: ClientService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Reactive Forms
    this.form = this._formBuilder.group({
        nit_passport : ['', Validators.required],
        firstName    : ['', Validators.required],
        lastName     : ['', Validators.required]
    });
  }

  onSubmit(myform:NgForm) {
    let result = this.form.getRawValue();
    if(this.checkFullInfo(result)){
      const c = new Client(
        String(result.nit_passport),
        result.firstName,
        result.lastName
      );
      this.clientService.addClient( c )
        .subscribe(
          ({ _id }) => this.router.navigate(['/clientes'])
        );
        myform.resetForm();
    }else{
      return false;
    }
  }

  checkFullInfo(obj): Boolean{
    var k = Object.keys(obj);
    for(let i=0;i<k.length;i++){
      if(!(obj[k[i]] != '')){
        return false;
      }
    }
    return true;
  }

}
