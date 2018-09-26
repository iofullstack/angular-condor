import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

import { Client } from '../client.model'
import { ClientService } from '../client.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    const c = new Client(
      form.value.nit_passport,
      form.value.firstName,
      form.value.lastName
    )
    // console.log(c);
    this.clientService.addClient( c )
        .subscribe(
          ({ _id }) => this.router.navigate(['/clientes'])
        );
    form.resetForm();
  }

}
