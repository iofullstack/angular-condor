import { Component, OnInit } from '@angular/core'

import { Client } from '../client'
// import { ClientService } from '../client.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // clients: Client[]
  client: Client = {
    id: 1,
    nit_passport: 'puta',
    firstName: 'barata',
    lastName: 'Jose'
  }

  constructor(
    // private clientService: ClientService
  ) { }

  ngOnInit() {
    // this.getClients()
  }

  // getClients(): void {
  //   this.clientService.getClients()
  //     .subscribe(clients => this.clients = clients)
  // }

  add(): void {
    console.log(this.client)
    // if (!data) { return }
    // this.clientService.addClient({ data } as Client)
    //   .subscribe(client => {
    //     this.clients.push(client)
    //   })
  }

}
